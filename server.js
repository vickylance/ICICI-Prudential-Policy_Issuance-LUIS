var restify = require('restify');
var builder = require('botbuilder');
var sourceFile = require('./sourceFile');

//luis ai app model for CTD-TN-ChatBot
var recognizer = new builder.LuisRecognizer('https://westus.api.cognitive.microsoft.com/luis/v2.0/apps/1bc09642-7148-4ef9-b488-1111c17e87b5?subscription-key=d4ceb0047f654efeb70283e87a351c94&verbose=true');
var luisDialog = new builder.IntentDialog({
    recognizers: [recognizer]
});

// #chat connector
var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function () {
    console.log('%s listening to %s', server.name, server.url);
});

var connector = new builder.ChatConnector({
    appId: process.env.MICROSOFT_APP_ID,
    appPassword: process.env.MICROSOFT_APP_PASSWORD
});
var bot = new builder.UniversalBot(connector);
server.post('/api/messages', connector.listen());
// #end chat connector

// //#region Console Connector
// var connector = new builder.ConsoleConnector().listen();
// var bot = new builder.UniversalBot(connector, {
//     localizerSettings: {
//         botLocalePath: "./node_modules/botbuilder/lib/locale",
//         defaultLocale: "en"
//     }
// });
// var server = restify.createServer(); // Setup Restify Server
// server.get(/.*/, restify.serveStatic({ // Serve a static web page
//     'directory': '.',
//     'default': 'index.html'
// }));
// server.listen(process.env.port || process.env.PORT || 3978, process.env.IP || process.env.ip, function() {
//     console.log('%s listening to %s', server.name, server.url);
// });
// //#endregion Console Connector


//Create bot root dialog
bot.dialog('/', luisDialog);

//App 1
luisDialog.matches('None', builder.DialogAction.send(sourceFile.None));
luisDialog.matches('PolicyIssuance_Misplace', builder.DialogAction.send(sourceFile.PolicyIssuance_Misplace));
luisDialog.matches('PolicyIssuance_FreeLookPeriod', builder.DialogAction.send(sourceFile.PolicyIssuance_FreeLookPeriod));
luisDialog.matches('PolicyIssuance_CancelFreeLookAmountBack', builder.DialogAction.send(sourceFile.PolicyIssuance_CancelFreeLookAmountBack));
luisDialog.matches('PolicyIssuance_CancelFreeLook', builder.DialogAction.send(sourceFile.PolicyIssuance_CancelFreeLook));
luisDialog.matches('PolicyIssuance_TrackPolicy', builder.DialogAction.send(sourceFile.PolicyIssuance_TrackPolicy));
luisDialog.matches('PolicyIssuance_PayPremium', builder.DialogAction.send(sourceFile.PolicyIssuance_PayPremium));
luisDialog.matches('PolicyIssuance_CheckPaidPremium', builder.DialogAction.send(sourceFile.PolicyIssuance_CheckPaidPremium));
luisDialog.matches('PolicyIssuance_ReviveUnPaidPolicy', builder.DialogAction.send(sourceFile.PolicyIssuance_ReviveUnPaidPolicy));
luisDialog.matches('PolicyIssuance_PolicyLapseDiscontinuedDefine', builder.DialogAction.send(sourceFile.PolicyIssuance_PolicyLapseDiscontinuedDefine));
luisDialog.matches('PolicyIssuance_PolicyLapseDiscontinued', builder.DialogAction.send(sourceFile.PolicyIssuance_PolicyLapseDiscontinued));
luisDialog.matches('PolicyIssuance_PolicyLapseDiscontinuedRevive', builder.DialogAction.send(sourceFile.PolicyIssuance_PolicyLapseDiscontinuedRevive));

// String.prototype.contains = function(content){
//   return this.indexOf(content) !== -1;
// }

// bot.dialog('/', function (session) {
//     if(session.message.text.toLowerCase().contains('hello')){
//       session.send('Hey, How are you? yolo');
//       }else if(session.message.text.toLowerCase().contains('help')){
//         session.send('How can I help you?');
//       }else{
//         session.send('Sorry I don\'t understand you...');
//       }
// });



// luisDialog.matches('PolicyIssuance_FreeLookPeriod', builder.Dialog.begin(session.send(sourceFile.PolicyIssuance_FreeLookPeriod + ' yol')));
