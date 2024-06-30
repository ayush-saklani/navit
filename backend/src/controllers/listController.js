import Lists from "../models/listmodel.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";

const get_list = asyncHandler(async (req, res, next) => {
    const type = req.query.type;
    if (!type) {
        throw new ApiError(400, `Missing required parameter "type"`);
    }

    const listData = await Lists.findOne({
        type: type,
    }).select("data");

    if (!listData) {
        throw new ApiError(404, "List not found");
    }
    res.status(200).json(new ApiResponse(200, listData));
});

const save_list = asyncHandler(async (req, res, next) => {
    const type = req.body.type;
    const data = req.body.data;

    const rooms_data = await Lists.findOne({
        type: type,
    });

    if (rooms_data) {
        await Lists.findOneAndUpdate(
            {
                type: type,
            },
            {
                $set: {
                    data: data,
                },
            }
        );
        res.status(200).json(
            new ApiResponse(200, {}, "success! already exists and updated")
        );
    } else {
        throw new ApiError(404, "no list with this name exists");
    }
});

export { get_list, save_list };
