
using System;
using WebSocketSharp;

namespace SocketSharp
{
  public class SocketSharp
  {
    public static void Main (string[] args)
    {
            Console.WriteLine("Hello World!");
      using (var ws = new WebSocket ("http://localhost:3000")) {
       /* ws.OnMessage += (sender, e) =>
          Console.WriteLine ("Laputa says: " + e.Data);*/

        ws.Connect ();
      }
    }
  }
}
