import "@expo/metro-runtime";
import { StyleSheet, Text, View, Linking, Platform, Pressable } from 'react-native';
import { init, events, os, app, window as neutrawindow } from "@neutralinojs/lib";

init();

//deberia ir en un controlador
async function onOpenLink(url) {	
	(Platform.OS === 'web') ? os.open(url) : await Linking.openURL(url);
}

function setTray() {
    if(NL_MODE != "window") {
        console.log("INFO: Tray menu is only available in the window mode.");
        return;
    }
	
    let tray = {
        icon: "/ireti-src/public/icons/trayIcon.png",
        menuItems: [
            {id: "VERSION", text: "Get version"},
            {id: "SEP", text: "-"},
            {id: "QUIT", text: "Quit"}
        ]
    };
    os.setTray(tray);
}

function exit(event){
	events.off("trayMenuItemClicked", onTrayMenuItemClicked);
	app.exit();
}

//deberia ir en un controller
function onTrayMenuItemClicked(event) {
    switch(event.detail.id) {
        case "VERSION":
            os.showMessageBox("Version information", `Neutralinojs server: v${NL_VERSION} | Neutralinojs client: v${NL_CVERSION}`);
            break;
        case "QUIT":
            exit();
            break;
    }
}

events.on("ready", async () => {	
    events.on("trayMenuItemClicked", onTrayMenuItemClicked);
    events.on("windowClose", exit);		
	if(NL_OS != "Darwin") { // TODO: Fix https://github.com/neutralinojs/neutralinojs/issues/615
        setTray();
    }
  
    await neutrawindow.show();

    
});

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <Text>{NL_APPID} is running on port {NL_PORT}  inside {NL_OS}</Text>
      <Text>server: v{NL_VERSION} . client: v{NL_CVERSION}</Text>		  
	  <View style={styles.fixToText}>
		  <Pressable onPress={(event) => onOpenLink("https://neutralino.js.org/docs")} style={styles.pressable}>
			<Text>Docs</Text>
		  </Pressable>
		  <Pressable onPress={(event) => onOpenLink("https://www.youtube.com/c/CodeZri")} style={styles.pressable}>
			<Text>Video tutorial</Text>
		  </Pressable>
	  </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pressable: {
	borderRadius: 8,
    padding: 6,
	backgroundColor: 'rgb(210, 230, 255)'
  },
  fixToText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
