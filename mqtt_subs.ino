#include <ESP8266WiFi.h>
#include <PubSubClient.h>

// WiFi
const char *ssid = "Redmi144"; // Enter your WiFi name
const char *password = "putri244";  // Enter WiFi password

// MQTT Broker
const char *mqtt_broker = "stingray.rmq.cloudamqp.com";
const char *topic = "/anang/echarging";
const char *mqtt_username = "qufajbbc:qufajbbc";
const char *mqtt_password = "lnOB6BblSDZUiuKM5ZZ9FsNtLKlqEQoR";
const int mqtt_port = 1883;

WiFiClient espClient;
PubSubClient client(espClient);

void setup() {
  //initialize digital pin LED_BUILTIN as an output
  pinMode(LED_BUILTIN, OUTPUT);  
  // Set software serial baud to 115200;
  Serial.begin(115200);
  // connecting to a WiFi network
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
      delay(500);
      Serial.println("Connecting to WiFi..");
  }
  Serial.println("Connected to the WiFi network");
  //connecting to a mqtt broker
  client.setServer(mqtt_broker, mqtt_port);
  client.setCallback(callback);
  while (!client.connected()) {
      String client_id = "anang143-client-";
      client_id += String(WiFi.macAddress());
      Serial.printf("The client %s connects to the public mqtt broker\n", client_id.c_str());
      if (client.connect(client_id.c_str(), mqtt_username, mqtt_password)) {
          Serial.println("Cloudamqp broker connected");
      } else {
          Serial.print("failed with state ");
          Serial.print(client.state());
          delay(2000);
      }
  }
  // publish and subscribe
  //client.publish(topic, "hello emqx");
  client.subscribe(topic);
}

void callback(char *topic, byte *payload, unsigned int length) {
  Serial.print("Message arrived in topic: ");
  Serial.println(topic);
  Serial.print("Message:");
  String statusBat;

  for (int i = 0; i < length; i++) {
      Serial.print((char) payload[i]);
      statusBat += (char) payload[i];      
  }
  Serial.println();
  Serial.println("-----------------------");
  
  if(statusBat == "on") {
    Serial.println("on");
    digitalWrite(LED_BUILTIN, LOW);
  }
  else if (statusBat == "off") {
    Serial.println("off");
    digitalWrite(LED_BUILTIN, HIGH);
  }
}

void loop() {
  client.loop();
}
