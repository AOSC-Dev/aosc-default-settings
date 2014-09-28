/* Derived from Kubuntu configuration */

// ---------------------------------- DATA ---------------------------------- //
/*** Maps widget and plugin names to keyboard shortcuts */
var keyMap = {
    launcher: 'Alt+F1',
    battery: 'Battery',
    'org.kde.plasma-nm': 'Wireless'
};

// -------------------------------- FUNCTIONS ------------------------------- //
function setShortcut(widget) {
    if (!keyMap[widget.type]) {
        print("00-defaultLaytout::setShortcut: " + widget.type + " not mapped to a key, but mapping requested");
        return;
    }
    widget.globalShortcut = keyMap[widget.type];
}

function setPluginShortcut(systray) {
    var name = systray.readConfig('plugin', '');
    if (!keyMap[name]) {
        print("00-defaultLaytout::setPluginShortcut: " + name + " not mapped to a key, but mapping requested");
        return;
    }
    systray.currentConfigGroup = systray.currentConfigGroup.concat("Shortcuts");
    systray.writeConfig("global", keyMap[name]);
    systray.currentConfigGroup = systray.currentConfigGroup.splice(-1, 1);
}


// ---------------------------------- PANEL --------------------------------- //
var panel = new Panel("panel");
panel.screen = 0;
panel.location = "bottom";
launcher = panel.addWidget("launcher");
launcher.globalShortcut = "Alt+F1"
panel.addWidget("org.kde.showActivityManager");
panel.addWidget("tasks");
panel.addWidget("showdesktop");
panel.addWidget("kimpanel");

systray = panel.addWidget("systemtray");
i = 0;
if (hasBattery) {
    systray.currentConfigGroup = new Array("Applets", ++i);
    systray.writeConfig("plugin", "battery");
    setPluginShortcut(systray);
}
systray.currentConfigGroup = new Array("Applets", ++i);
systray.writeConfig("plugin", "org.kde.ktp-presence");
systray.currentConfigGroup = new Array("Applets", ++i);
systray.writeConfig("plugin", "printmanager");
systray.currentConfigGroup = new Array("Applets", ++i);
systray.writeConfig("plugin", "org.kde.plasma-nm");
setPluginShortcut(systray);
systray.currentConfigGroup = new Array("Applets", ++i);
systray.writeConfig("plugin", "notifier");
systray.currentConfigGroup = new Array("Applets", ++i);
systray.writeConfig("plugin", "touchpad");

clock = panel.addWidget("digital-clock");
clock.writeConfig("displayEvents", "false");

// --------------------------------- DESKTOP -------------------------------- //
for (var i = 0; i < screenCount; ++i) {
    var desktop = new Activity
    desktop.name = i18n("Desktop")

    desktop.screen = i
    desktop.wallpaperPlugin = 'image'
    desktop.wallpaperMode = 'SingleImage'

    //Create more panels for other screens
    if (i > 0){
        var panel = new Panel
        panel.screen = i
        panel.location = 'bottom'
        panel.height = panels()[i].height = screenGeometry(0).height > 1024 ? 35 : 27
        var tasks = panel.addWidget("tasks")
        tasks.writeConfig("showOnlyCurrentScreen", true);
    }
}
