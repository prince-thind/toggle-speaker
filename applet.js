const Applet = imports.ui.applet;
const Util = imports.misc.util;

function MyApplet(metadata, orientation, panel_height, instance_id) {
  this._init(metadata, orientation, panel_height, instance_id);
}

let globalPath=null;

MyApplet.prototype = {
  __proto__: Applet.IconApplet.prototype,

  _init: function ( metadata, orientation, panel_height, instance_id) {
    Applet.IconApplet.prototype._init.call(
      this,
      
      orientation,
      panel_height,
      instance_id
    );

    this.speakerOn = false;
    this.set_applet_icon_path(metadata.path + "/mute.png");
    globalPath=metadata.path;
    //this.set_applet_icon_name("./mute.png");
    speakerOff();
    this.set_applet_tooltip(_("Click here to toggle speakers"));
  },

  on_applet_clicked: function () {
    const path=globalPath;
    if (this.speakerOn) {
    this.set_applet_icon_path(path + "/mute.png");
      speakerOff();
    } else {
     this.set_applet_icon_path(path + "/unmute.png");
      speakerOn();
    }

    this.speakerOn = !this.speakerOn;
  },
};

function speakerOn() {
  Util.spawnCommandLine("amixer sset Speaker 100%+");
  Util.spawnCommandLine("amixer set Speaker unmute");
}

function speakerOff() {
  Util.spawnCommandLine("amixer sset Speaker 100%-");
  Util.spawnCommandLine("amixer set Speaker mute");
}

function main(metadata, orientation, panel_height, instance_id) {
  return new MyApplet(metadata, orientation, panel_height, instance_id);
}
