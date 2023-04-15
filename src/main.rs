#![cfg_attr(
all(not(debug_assertions), target_os = "windows"),
windows_subsystem = "windows"
)]

use std::sync::RwLock;

use matchpoint_core::double_elimination::PlannedGame;
use matchpoint_core::game::{GameId, GameResult, PlayerId, TTSet};
use matchpoint_core::tournament_manager::TournamentManager;
use serde::{Deserialize, Serialize};
use tauri::{AppHandle, Manager, State};

#[derive(Serialize, Debug, Clone)]
struct NewGamePayload {
    game_id: GameId,
    player1: PlayerId,
    player2: PlayerId,
}

#[derive(Deserialize, Debug, Clone)]
struct ResultPayload {
    game_id: GameId,
    score: (u8, u8),
    sets: Vec<(u8, u8)>,
}

struct TauriState {
    tm: RwLock<TournamentManager>,
}

impl TauriState {
    fn new() -> Self {
        Self {
            tm: RwLock::new(TournamentManager::new().expect("No TM"))
        }
    }
}

impl ResultPayload {
    fn game_result(&self) -> GameResult {
        GameResult {
            score: self.score,
            sets: self.sets.iter()
                .map(|set| TTSet(set.0, set.1))
                .collect(),
        }
    }
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![start, provide_result])
        .manage(TauriState::new())
        .plugin(tauri_plugin_window_state::Builder::default().build())
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

#[tauri::command]
async fn start(app: AppHandle, state: State<'_, TauriState>) -> Result<(), ()> {
    let mut tournament_manager = state.tm.write().unwrap();
    let games = tournament_manager.start((0..16).collect()).expect("ER");
    announce_games(app, games);
    Ok(())
}

#[tauri::command]
async fn provide_result(app: AppHandle, state: State<'_, TauriState>, result: ResultPayload) -> Result<(), ()> {
    let mut tournament_manager = state.tm.write().unwrap();
    let new_games = tournament_manager.provide_result(result.game_id, result.game_result());
    announce_games(app, new_games);
    Ok(())
}

fn announce_games(app: AppHandle, games: Vec<PlannedGame>) {
    for game in games {
        app.emit_all("new-game", NewGamePayload {
            game_id: game.game_id,
            player1: game.player1,
            player2: game.player2,
        }).unwrap();
    }
}
