#include <ESP8266WiFi.h>
#include <WiFiClient.h>
#include <ESP8266WiFiMulti.h>
#include <ESP8266mDNS.h>
#include <ESP8266WebServer.h>

ESP8266WiFiMulti wifiMulti;
ESP8266WebServer server(80);

int LUM = D1, LDM = D0, RUM = D2, RDM = D3, BUZZ = D4, LED = D5, button = D6;
bool button_state;

void setup() {
  pinMode(D0, OUTPUT);
  pinMode(D1, OUTPUT);
  pinMode(D2, OUTPUT);
  pinMode(D3, OUTPUT);
  pinMode(D4, OUTPUT);
  pinMode(D5, OUTPUT);
  pinMode(D6, INPUT_PULLUP); // Button as input with internal pull-up resistor

  // Ensure all motor control pins are initially turned off
  digitalWrite(LUM, LOW);
  digitalWrite(LDM, LOW);
  digitalWrite(RUM, LOW);
  digitalWrite(RDM, LOW);

  Serial.begin(9600);
  Serial.println("");
  Serial.println("System started");
  wifiMulti.addAP("TimelyMeds", "timely1234");
  Serial.println("Connecting ...");
  
  while (wifiMulti.run() != WL_CONNECTED) {
    delay(250);
    Serial.print('.');
  }

  Serial.println('\n');
  Serial.print("Connected to ");
  Serial.println(WiFi.SSID());
  Serial.print("IP address:\t");
  Serial.println(WiFi.localIP());

  if (MDNS.begin("esp8266")) {
    Serial.println("mDNS responder started");
  } else {
    Serial.println("Error setting up MDNS responder!");
  }

  server.on("/", HTTP_GET, handleRoot);
  server.on("/dispense", HTTP_POST, handleDispense);
  server.onNotFound(handleNotFound);
  server.enableCORS(true);
  server.begin();
  Serial.println("HTTP server started");
}

void handleRoot() {
  server.send(200, "text/html", "Serve Is Active");
}

void handleDispense() {
  Serial.println("Dispense");
  auto state = server.arg("plain");
  Serial.println(state);

  for (int i = 0; i < state.length(); i++) {
    char c = state[i];
    Serial.println(c);
    if (c == 'a') {
      digitalWrite(LUM, HIGH);
      delay(2000);
      digitalWrite(LUM, LOW);
    }
    if (c == 'b') {
      digitalWrite(RUM, HIGH);
      delay(2000);
      digitalWrite(RUM, LOW);
    }
    if (c == 'c') {
      digitalWrite(LDM, HIGH);
      delay(2000);
      digitalWrite(LDM, LOW);
    }
    if (c == 'd') {
      digitalWrite(RDM, HIGH);
      delay(2000);
      digitalWrite(RDM, LOW);
    }
  }

  server.send(200);
  flashLEDWithBuzzer();
}

void handleNotFound() {
  server.send(404, "text/plain", "404: Not found");
}

void flashLEDWithBuzzer() {
  unsigned long startTime = millis();
  button_state = digitalRead(button); // Record initial button state
  while (millis() - startTime < 120000) {
    tone(BUZZ, 1000, 100);
    digitalWrite(LED, HIGH);
    delay(100);
    tone(BUZZ, 0, 100);
    digitalWrite(LED, LOW);
    delay(100);

    if (digitalRead(button) != button_state) {
      turnOffLEDAndBuzzer();
      return;
    }
  }
  turnOffLEDAndBuzzer();
}

void turnOffLEDAndBuzzer() {
  noTone(BUZZ);
  digitalWrite(LED, LOW);
}

void loop() {
  server.handleClient();
  MDNS.update();
}
