const Meta = imports.gi.Meta;

let _windowCreatedId;

function enable() {
    _windowCreatedId = global.display.connect('window-created', (d, win) => {
        // Only try to maximize windows that are marked to support this.
        // Other windows (e.g. dialogs) can often actually be maximized,
        // but then no longer unmaximized by the user, so we really need
        // to check this.
        if (win.can_maximize()) {
            win.maximize(Meta.MaximizeFlags.HORIZONTAL | Meta.MaximizeFlags.VERTICAL)
        } else {
            // Workaround for dialogs that were previously maximized by
            // us (when we did not check for can_maximize yet) and
            // remember their size.
            win.unmaximize(Meta.MaximizeFlags.HORIZONTAL | Meta.MaximizeFlags.VERTICAL)
        }
    });
}

function disable() {
    global.display.disconnect(_windowCreatedId);
}
