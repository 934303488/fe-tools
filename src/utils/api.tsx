

export default {
  fileUpload: '/file/upload',
  getMusic: '/music/list',
};

export const TOOLS_API={
  getBearerToken:'/getBearerToken',
}

export const ORDER_API={
  orderLogisticsChange:'/order/logistics-change',
  orderList: '/order/distributor-order/list',
}

export const DIRECTORY_API={
  directoryPage:'/directory/page',
  directoryUpsert:'/directory/upsert',
}

export const DRAW_API={
  luckDraw:'/lucky-draw/do/lucky-draw',
  pondList:'/lucky-draw/candidates/list',
  luckDrawResult: '/lucky-draw/get/lucky-draw-result',
  lateRecordsList: '/lucky-draw/get/late-records/list',
  addLateRecords: '/lucky-draw/do/add/late-records',
  editPonds: '/lucky-draw/do/update-status',
  addPonds: '/private/lucky-draw/import-candidates'
}

export const NODE_API={
  nodeUpdate:'/node/update',
  nodeTree:'/node/tree'
}

export const CRYPTO_API={
  encryption:'/encryption/value/get',
  decryption:'/decryption/value/get'
}