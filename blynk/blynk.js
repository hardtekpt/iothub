const Blynk = require("blynk-library");
const miio = require("miio");

// ------ Constants --> get from db
//const token = "6b14f810ff864d5caf853551755d4293";
const token = "98274ba1af904fd9877416c27bc614e6";
//const blynkIP = "95.95.64.185";
const blynkIP = "109.49.76.78";
const blynkPort = 8080;
const bulbIP = "192.168.1.8";
// ------ End Constants

// Blynk config
const blynk = new Blynk.Blynk(
  token,
  (options = {
    connector: new Blynk.TcpClient(
      (options = { addr: blynkIP, port: blynkPort })
    )
  })
);

blynk.on("error", err => {
  switch (err) {
    case "ECONNREFUSED":
      console.log("Connection to the blynk server was lost");
      // set blynk server status (global variable)
      break;

    default:
      console.log("There was an error with Blynk");
      break;
  }
});

miio
  .device({ address: bulbIP, token: "5d51c5e2bb0beb6360eb4cb19d5f5363" })
  .then(device => {
    device.management.info().then(info => {
      console.log(
        `=> Connected to device ${info.model} \n\t=> Token: ${
          info.token
        }\n\t=> Uid: ${info.uid}\n\t=> SSID: ${info.ap.ssid}\n\t=> IP: ${
          info.netif.localIp
        }`
      );
      device.destroy();
    });
  })
  .catch(err => console.log(err));

const power = new blynk.VirtualPin(10);
const brightness = new blynk.VirtualPin(11);
const temperature = new blynk.VirtualPin(12);
const teste = new blynk.VirtualPin(5);

power.on("write", function(param) {
  miio
    .device({ address: bulbIP })
    .then(device => {
      device
        .setPower(param == 1 ? true : false)
        .then(on => {
          device.destroy();
        })
        .catch(err => console.log(err));
    })
    .catch(err => console.log(err));
});

brightness.on("write", param => {
  miio
    .device({ address: bulbIP })
    .then(device => {
      device
        .setBrightness(parseInt(param, 10))
        .then(brightness => {
          device.destroy();
        })
        .catch(err => console.log(err));
    })
    .catch(err => console.log(err));
});

temperature.on("write", param => {
  const temp = `${param}k`;
  miio
    .device({ address: bulbIP })
    .then(device => {
      device.setColor(temp).then(color => {
        device.destroy();
      });
    })
    .catch(err => console.log(err));
});

teste.on("write", param => {
  console.log(param);
});
teste.on("read", param => {
  console.log(param);
});
