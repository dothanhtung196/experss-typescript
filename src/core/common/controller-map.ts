import fs from "fs";
import path from "path";
import _, { result } from "lodash";

export const ControllerMap = () => {
    const basename = path.basename(__filename);
    const controllerFolderPath = __dirname + "../../../controllers";

    return fs.readdirSync(controllerFolderPath)
        .filter(file => file.indexOf(".") && (file !== basename) && (file.slice(-3) === '.ts'))
        .map(file => {
            return import(path.join(controllerFolderPath, file));
        });
}