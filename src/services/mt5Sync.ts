import { MT5Account } from '../types/trade';

export function generateMQL5ExpertAdvisorCode(webhookUrl: string, apiToken: string, accountNumber: string): string {
  return `//+------------------------------------------------------------------+
//|                                                AlphaLog_Sync.mq5 |
//|                             AlphaLog Pro Automated Webhook EA    |
//|                                  https://alphalog.terminal/sync  |
//+------------------------------------------------------------------+
#property copyright "AlphaLog Quantitative Engine"
#property link      "https://alphalog.terminal"
#property version   "3.00"
#property strict

//--- Input Parameters
input string InpWebhookUrl = "${webhookUrl}"; // AlphaLog Webhook API URL
input string InpApiToken   = "${apiToken}";   // Sync Security Token
input string InpAccountNum = "${accountNumber}"; // MT5 Account Number

//+------------------------------------------------------------------+
//| Expert initialization function                                   |
//+------------------------------------------------------------------+
int OnInit()
{
   Print("AlphaLog Terminal EA Initialized for Account: ", InpAccountNum);
   SendSyncHeartbeat();
   return(INIT_SUCCEEDED);
}

//+------------------------------------------------------------------+
//| Trade transaction handler: detects closed deals immediately      |
//+------------------------------------------------------------------+
void OnTradeTransaction(const MqlTradeTransaction& trans,
                        const MqlTradeRequest& request,
                        const MqlTradeResult& result)
{
   if(trans.type == TRADE_TRANSACTION_DEAL_ADD)
   {
      ulong deal_ticket = trans.deal;
      if(HistoryDealSelect(deal_ticket))
      {
         long deal_entry = HistoryDealGetInteger(deal_ticket, DEAL_ENTRY);
         // Process deals that close or partially close positions (OUT)
         if(deal_entry == DEAL_ENTRY_OUT || deal_entry == DEAL_ENTRY_INOUT)
         {
            SendDealToAlphaLog(deal_ticket);
         }
      }
   }
}

//+------------------------------------------------------------------+
//| Format JSON payload and send via WebRequest to AlphaLog Terminal |
//+------------------------------------------------------------------+
void SendDealToAlphaLog(ulong ticket)
{
   string symbol       = HistoryDealGetString(ticket, DEAL_SYMBOL);
   long   type         = HistoryDealGetInteger(ticket, DEAL_TYPE);
   double volume       = HistoryDealGetDouble(ticket, DEAL_VOLUME);
   double price        = HistoryDealGetDouble(ticket, DEAL_PRICE);
   double profit       = HistoryDealGetDouble(ticket, DEAL_PROFIT);
   double commission   = HistoryDealGetDouble(ticket, DEAL_COMMISSION);
   double swap         = HistoryDealGetDouble(ticket, DEAL_SWAP);
   datetime time       = (datetime)HistoryDealGetInteger(ticket, DEAL_TIME);
   
   string typeStr = (type == DEAL_TYPE_BUY) ? "BUY" : "SELL";
   
   string json = "{"
      + "\\"ticket\\":" + IntegerToString(ticket) + ","
      + "\\"accountNumber\\":\\"" + InpAccountNum + "\\","
      + "\\"symbol\\":\\"" + symbol + "\\","
      + "\\"type\\":\\"" + typeStr + "\\","
      + "\\"volume\\":" + DoubleToString(volume, 2) + ","
      + "\\"closePrice\\":" + DoubleToString(price, 5) + ","
      + "\\"profit\\":" + DoubleToString(profit, 2) + ","
      + "\\"commission\\":" + DoubleToString(commission, 2) + ","
      + "\\"swap\\":" + DoubleToString(swap, 2) + ","
      + "\\"closeTime\\":\\"" + TimeToString(time, TIME_DATE|TIME_SECONDS) + "\\""
      + "}";
      
   char postData[];
   char resultData[];
   string resultHeaders;
   StringToCharArray(json, postData, 0, WHOLE_ARRAY, CP_UTF8);
   
   string headers = "Content-Type: application/json\\r\\nAuthorization: Bearer " + InpApiToken + "\\r\\n";
   int timeout = 5000;
   
   int res = WebRequest("POST", InpWebhookUrl, headers, timeout, postData, resultData, resultHeaders);
   if(res == 200) {
      Print("AlphaLog EA: Deal #", ticket, " synced successfully.");
   } else {
      Print("AlphaLog EA: WebRequest failed with error: ", GetLastError(), " / HTTP Code: ", res);
   }
}

void SendSyncHeartbeat()
{
   Print("AlphaLog EA: Connected and listening for MT5 closed trades.");
}
`;
}

export function downloadMQL5File(code: string, filename = 'AlphaLog_Sync.mq5') {
  const blob = new Blob([code], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export interface SyncStatus {
  status: 'idle' | 'syncing' | 'connected' | 'error';
  lastPingMs: number;
  message: string;
}

export async function pingMT5Endpoint(account: MT5Account): Promise<{ success: boolean; latency: number }> {
  const startTime = Date.now();
  // Simulate network roundtrip latency with server
  await new Promise(resolve => setTimeout(resolve, 380 + Math.random() * 220));
  const latency = Date.now() - startTime;
  return {
    success: true,
    latency
  };
}
