const Meta = imports.gi.Meta;

let _windowCreatedId;

function enable() {
    _windowCreatedId = global.display.connect('window-created', (d, win) =>
        win.maximize(Meta.MaximizeFlags.HORIZONTAL | Meta.MaximizeFlags.VERTICAL)
    );
}

function disable() {
    global.display.disconnect(_windowCreatedId);
}
