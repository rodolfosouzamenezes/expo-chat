import dayjs from "dayjs";
var localizedFormat = require('dayjs/plugin/localizedFormat')
import "dayjs/locale/pt-br";

dayjs.locale('pt-br')
dayjs.extend(localizedFormat)
