import { startServer } from "./api";
import Logger from "./lib/logger";
import { launch, unlaunch } from "./launch";
import { Cargo, TiempoReal, Trabajador, Lote } from "./schemas";
import { hashPassword } from "./lib/crypto";
import { TipoDato } from "./schemas/tiempoReal.schema";

const logger = Logger();

function verifyEnv() {
  const requiredEnv = [
    "NODE_ENV", // "production", "development"
    "PORT", // "3000" ...
    "API_SESSION_SECRET", // "secret" ...
    "ENCRYPT_SALT_ROUNDS", // "10" ...
    "MYSQL_HOST", // "localhost" ...
    "MYSQL_USER", // 
    "MYSQL_PASSWORD", // 
    "MYSQL_DATABASE", // 
    "MYSQL_PORT", // "3306" ...
    "PLC_LOGIN_USER", // "admin" ...
    "PLC_LOGIN_PASSWORD", // "admin" ...
  ];

  const missingEnv = requiredEnv.filter(env => !process.env[env]);
  if (missingEnv.length) {
    throw new Error(`Missing environment variables: ${missingEnv.join(", ")}`);
  }
}

async function cleanup() {
  logger.info("Cleaning up");

  await unlaunch().catch((error) => logger.error("Error unlaunching at cleanup", error));

  logger.info("Cleaned up");
}

function registerEvents() {
  process.on("unhandledRejection", (reason, promise) => {
    logger.error("Unhandled Rejection at:", promise, "reason:", reason);
  });

  process.on('uncaughtException', (error) => {
    logger.error('Uncaught Exception thrown', error);
    setImmediate(() => process.exit(1));
  });


  let alreadyHandling = false;
  ['exit', 'SIGINT', 'SIGUSR1', 'SIGUSR2', 'SIGTERM'].forEach(eventType => {
    process.on(eventType, async () => {
      if (alreadyHandling) return;
      alreadyHandling = true;

      logger.info(`Process exiting with code ${eventType}`);

      await cleanup();

      setImmediate(() => process.exit(0));
    });
  });
}

async function main() {
  try {
    verifyEnv();

    // call launch (database)
    await launch();

    // TODO eliminar
    if ((await Trabajador.findOne({ where: { email: "pepe@pepe.com" } })) === null) {
      let cargo: Cargo | null;
      if ((cargo = await Cargo.findOne({ where: { nombre: "Administrador" } })) === null) {
        cargo = await Cargo.create({ nombre: "Administrador" });
      }
      await Trabajador.create({
        email: "pepe@pepe.com",
        nombre: "Pepe",
        apellido: "Lopez",
        passwordHash: hashPassword("pepe"),
        id_Cargo: cargo.id_Cargo,
      });
    }
    //crear usuario de prueba
    if ((await Trabajador.findOne({ where: { email: "jon@jon.com" } })) === null) {
      let cargo: Cargo | null;
      if ((cargo = await Cargo.findOne({ where: { nombre: "Operador" } })) === null) {
        cargo = await Cargo.create({ nombre: "Operador" });
      }
      await Trabajador.create({
        email: "jon@jon.com",
        nombre: "Jon",
        apellido: "Lopez",
        passwordHash: hashPassword("jon"),
        id_Cargo: cargo.id_Cargo,
      });
    }
    
    // server
    const port = await startServer();
    logger.info(`Server started at port ${port}`);

    registerEvents();

  } catch (error) {
    logger.error(error);
    setImmediate(() => process.exit(1));
  }
}

main();
