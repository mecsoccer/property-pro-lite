"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var Properties = {
  newValidProperty: {
    owner: '1',
    price: '300000.00',
    state: 'lagos',
    city: 'ikeja',
    address: 'computer village',
    type: '2 bedroom',
    image_url: 'https://images.com/img/myimage.png'
  },
  invalidOwner: {
    owner: [],
    price: '300000.00',
    state: 'lagos',
    city: 'ikeja',
    address: 'computer village',
    type: '2 bedroom',
    image_url: 'https://images.com/img/myimage.png'
  },
  invalidPrice: {
    owner: '1',
    price: '300000',
    state: 'lagos',
    city: 'ikeja',
    address: 'computer village',
    type: '2 bedroom',
    image_url: 'https://images.com/img/myimage.png'
  },
  invalidState: {
    owner: '1',
    price: '300000.00',
    state: 55342,
    city: 'ikeja',
    address: 'computer village',
    type: '2 bedroom',
    image_url: 'https://images.com/img/myimage.png'
  },
  invalidCity: {
    owner: '1',
    price: '300000.00',
    state: 'lagos',
    city: 34739,
    address: 'computer village',
    type: '2 bedroom',
    image_url: 'https://images.com/img/myimage.png'
  },
  invalidAddress: {
    owner: '1',
    price: '300000.00',
    state: 'lagos',
    city: 'ikeja',
    address: 7865,
    type: '2 bedroom',
    image_url: 'https://images.com/img/myimage.png'
  },
  invalidType: {
    owner: '1',
    price: '300000.00',
    state: 'lagos',
    city: 'ikeja',
    address: 'computer village',
    type: [],
    image_url: 'https://images.com/img/myimage.png'
  },
  invalidImageUrl: {
    owner: '1',
    price: '300000.00',
    state: 'lagos',
    city: 'ikeja',
    address: 'computer village',
    type: '2 bedroom',
    image_url: []
  },
  validPropertyUpdate: {
    price: '307000.00',
    state: 'abia',
    city: 'umuahia',
    address: 'anywhere you go',
    type: '3 bedroom',
    image_url: ''
  }
};
var _default = Properties;
exports["default"] = _default;
//# sourceMappingURL=propertyData.js.map