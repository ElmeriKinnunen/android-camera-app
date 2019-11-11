

import {
  PICTURE_SENT,
  CAMERA_PERMISSION_GRANTED,
  CAMERA_ROLL_PERMISSION_GRANTED,
  TAKING_PICTURE,
  PREDICTION_RECEIVED,
  RESET_PREDICTION,
  PHOTOS_LOADED,
  OPEN_IMAGE,
  DISCARD_PIC,
  ERROR_CAUGHT,
  RESET_ERROR,
  SLICK_CONFIG,
  SET_SLICK_INDEX
} from "./actions";

export default function reducer(
  state = {
    hasCameraPermission: false,
    hasCameraRollPermission: false,
    picture: {},
    pictureSent: false,
    toggleLoader: false,
    predictions: [],
    prediction: false,
    photos: [],
    openImage: false,
    error: false,
    slick: {},
    slickIndex: 1
  },
  action
) {
  switch (action.type) {
    case SET_SLICK_INDEX: {
      return update(state, {
        slickIndex: action.index
      })
    }
    case SLICK_CONFIG: {
      return update(state, {
        slick: action.slick
      })
    }
    case RESET_ERROR: {
      return update(state, {
        error: false,
      })
    }
    case ERROR_CAUGHT: {
      return update(state, {
        picture: {},
        pictureSent: false,
        toggleLoader: false,
        predictions: [],
        prediction: false,
        openImage: false,
        error: true,
      })
    }
    case DISCARD_PIC: {
      return update(state, {
        openImage: false,
        picture: {}
      })
    }
    case OPEN_IMAGE: {
      return update(state, {
        openImage: true,
        picture: { ...action.picture }
      })
    }
    case PHOTOS_LOADED: {
      return update(state, {
        photos: [...action.photos.edges]
      })
    }
    case RESET_PREDICTION: {
      return update(state, {
        prediction: false,
        openImage: false,
        predictions: {},
      })
    }
    case PREDICTION_RECEIVED: {
      let preds = [];
      for (let [key, value] of Object.entries(action.predictions)) {
        for (let [className, pred] of Object.entries(value)) {
          preds.push(prediction = { className, pred })
        }
      }
      return update(state, {
        pictureSent: false,
        prediction: true,
        predictions: [...preds],
      })
    }
    case TAKING_PICTURE: {
      return update(state, {
        takingPicture: true,
      })
    }
    case CAMERA_PERMISSION_GRANTED: {
      return update(state, {
        hasCameraPermission: true,
      })
    };
    case PICTURE_SENT: {
      return update(state, {
        pictureSent: true,
        takingPicture: false,
      })

    };
    case CAMERA_ROLL_PERMISSION_GRANTED: {
      return update(state, {
        hasCameraRollPermission: true,
      })
    }

    default: {
      return state;
    }
  }
}

export const update = (state, mutations) => {
  return Object.assign({}, state, mutations);
};
