#[cfg(target_os = "macos")]
#[macro_use]
extern crate objc;

use tauri::{Manager, WindowEvent};
use window_ext::WindowExt;

mod window_ext;

fn main() {
    let context = tauri::generate_context!();
    tauri::Builder::default()
        .setup(|app| {
            let win: tauri::Window = app.get_window("main").unwrap();

            win.set_transparent_titlebar(true);
            win.position_traffic_lights(14.0, 19.0);
            Ok(())
        })
        .on_window_event(|e| {
            let apply_offset = || {
                let win = e.window();
                win.position_traffic_lights(14.0, 19.0);
            };
            match e.event() {
                WindowEvent::Resized(..) => apply_offset(),
                WindowEvent::ThemeChanged(..) => apply_offset(),
                _ => {}
            }
        })
        .run(context)
        .expect("error while running tauri application");
}
