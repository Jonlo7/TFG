import * as db from './lib/database';

export async function launch() {
    await db.initialize();
}

export async function unlaunch() {
    if (db.isInitialized()) await db.deinitalize();
}