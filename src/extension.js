import Meta from 'gi://Meta';
import {Extension} from 'resource:///org/gnome/shell/extensions/extension.js';
import {PACKAGE_VERSION} from 'resource:///org/gnome/shell/misc/config.js';

export default class MaximizedByDefaultExtension extends Extension {
    enable() {
        const [major, minor] = PACKAGE_VERSION.split('.').map(s => Number(s));

        // Since gnome 49, the maximize/minimize methods no longer take a
        // direction argument, so adapt accordingly
        // https://gitlab.gnome.org/GNOME/mutter/-/commit/a1a062e9e1e43fd7f189174c5b2d660405bb9db0
        let args = []
        if (major < 49) {
            args = [Meta.MaximizeFlags.HORIZONTAL | Meta.MaximizeFlags.VERTICAL]
        }

        this._windowCreatedId = global.display.connect('window-created', (d, win) => {
            // Only try to maximize windows that are marked to support this.
            // Other windows (e.g. dialogs) can often actually be maximized,
            // but then no longer unmaximized by the user, so we really need
            // to check this.
            if (win.can_maximize()) {
                win.maximize(...args)
            } else {
                // Workaround for dialogs that were previously maximized by
                // us (when we did not check for can_maximize yet) and
                // remember their size.
                win.unmaximize(...args)
            }
        });
    }

    disable() {
        global.display.disconnect(this._windowCreatedId);
    }
}
