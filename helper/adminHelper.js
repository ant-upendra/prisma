import BaseHelper from "./baseHelper.js";


class AdminHelper extends BaseHelper {
  constructor() {
    super('admin');
  }
}

const adminHelper = new AdminHelper();

export default adminHelper;