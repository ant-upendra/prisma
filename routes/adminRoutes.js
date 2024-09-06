import { Router } from "express";
import _ from 'lodash'; 
import { addNewAdminHandler, deleteAdminHandler, getAdminDetailsHandler,getAdminListHandler,updateAdminDetailsHandler } from "../controller/adminController.js";
import responseStatus from '../constants/responseStatus.json' assert { type: 'json' };
import responseData from '../constants/responseData.json' assert { type: 'json' };
import prisma from "../DB/dbConfig.js"; 


const router = Router();

router.route("/list").post(async (req, res) => {
  try {
    let filter = {};
    const inputData = { ...req.body };
    if (inputData) {
      filter.pageNum = inputData.pageNum ? inputData.pageNum : 1;
      filter.pageSize = inputData.pageSize ? inputData.pageSize : 50;
      if (inputData.filters) {
        let { name, id } = inputData.filters;
        filter.query = {};

        if (name) {
          filter.query.data = {
            path: ['data', 'name'],
            string_contains: name,
          };
        }

        if (id) {
          filter.query.id = {
            contains: id
          };
        }
      }
    } else {
      filter.pageNum = 1;
      filter.pageSize = 50;
    }

    const outputResult = await getAdminListHandler(filter);
    res.status(responseStatus.STATUS_SUCCESS_OK);
    res.send({
      status: responseData.SUCCESS,
      data: {
        adminList: outputResult.list ? outputResult.list : [],
        adminCount: outputResult.count ? outputResult.count : 0,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(responseStatus.INTERNAL_SERVER_ERROR);
    res.send({
      status: responseData.ERROR,
      data: { message: err },
    });
  }
});


router.route("/new").post(async (req, res) => {
  try {
    if (!_.isEmpty(req.body)) {
      const outputResult = await addNewAdminHandler(req.body.admin);
      res.status(responseStatus.STATUS_SUCCESS_OK);
      res.send({
        status: responseData.SUCCESS,
        data: {
          admin: outputResult ? outputResult : {},
        },
      });
    } else {
      throw "no request body sent";
    }
  } catch (err) {
    console.log(err);
    res.status(responseStatus.INTERNAL_SERVER_ERROR);
    res.send({
      status: responseData.ERROR,
      data: { message: err },
    });
  }
});


router.route("/:id").get(async (req, res) => {
  try {
    if (req.params.id) {
      const gotAdmin = await getAdminDetailsHandler(req.params.id);
      res.status(responseStatus.STATUS_SUCCESS_OK);
      res.send({
        status: responseData.SUCCESS,
        data: {
          admin: gotAdmin ? gotAdmin : {},
        },
      });
    } else {
      throw "no id param sent";
    }
  } catch (err) {
    console.log(err);
    res.status(responseStatus.INTERNAL_SERVER_ERROR);
    res.send({
      status: responseData.ERROR,
      data: { message: err },
    });
  }
});

router.route("/:id/update").post(async (req, res) => {
  try {
    if (
      !_.isEmpty(req.params.id) &&
      !_.isEmpty(req.body) &&
      !_.isEmpty(req.body.admin)
    ) {
      let input = {
        objectId: req.params.id,
        updateObject: req.body.admin,
      };
      const updateObjectResult = await updateAdminDetailsHandler(input);
      res.status(responseStatus.STATUS_SUCCESS_OK);
      res.send({
        status: responseData.SUCCESS,
        data: {
          admin: updateObjectResult ? updateObjectResult : {},
        },
      });
    } else {
      throw new Error("No body or ID param sent");
    }
  } catch (err) {
    console.log(err);
    res.status(responseStatus.INTERNAL_SERVER_ERROR).send({
      status: responseData.ERROR,
      data: { message: err.message },
    });
  }
});

router.route("/:id/remove").post(async (req, res) => {
  try {
    if (req.params.id) {
      const deletedAdmin = await deleteAdminHandler(req.params.id);
      res.status(responseStatus.STATUS_SUCCESS_OK);
      res.send({
        status: responseData.SUCCESS,
        data: {
          hasAdminDeleted: true,
        },
      });
    } else {
      throw "no id param sent";
    }
  } catch (err) {
    console.log(err);
    res.status(responseStatus.INTERNAL_SERVER_ERROR);
    res.send({
      status: responseData.ERROR,
      data: { message: err },
    });
  }
});

export default router;