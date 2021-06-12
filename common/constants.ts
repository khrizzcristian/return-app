export const SETTINGS_SCHEMA = {
    'properties': {
        'maxDays': {'type': 'integer'},
        'excludedCategories': {'type': 'string'},
        'paymentBank': {'type': 'boolean'},
        'paymentCard': {'type': 'boolean'},
        'paymentVoucher': {'type': 'boolean'},
        'termsUrl': {'type': 'string'},
        'type': {'type': 'string'},
    },
    'v-security': {
        'allowGetAll': true,
        'publicFilter': ['maxDays', 'excludedCategories', 'paymentBank', 'paymentCard', 'paymentVoucher', 'termsUrl', 'type'],
        'publicJsonSchema': false,
    },
    'v-cache': false,
    'v-default-fields': ['id', 'createdIn', 'maxDays', 'excludedCategories', 'paymentBank', 'paymentCard', 'paymentVoucher', 'termsUrl', 'type'],
    'v-indexed': ['id', 'createdIn', 'maxDays', 'excludedCategories', 'paymentBank', 'paymentCard', 'paymentVoucher', 'termsUrl', 'type'],
}

export const RETURNS_SCHEMA = {
    'properties': {
        'userId': {'type': 'string', 'IsRelationship': true},
        'orderId': {'type': 'string', 'IsRelationship': true},
        'name': {'type': 'string'},
        'email': {'type': 'string', 'format': 'email'},
        'phoneNumber': {'type': 'string', 'maxLength': 50},
        'country': {'type': 'string', 'maxLength': 50},
        'locality': {'type': 'string', 'maxLength': 50},
        'address': {'type': 'string'},
        'totalPrice': {'type': 'integer'},
        'paymentMethod': {'type': 'string', 'maxLength': 25},
        'giftCardCode': {'type': 'string'},
        'giftCardId': {'type': 'string'},
        'refundedAmount': {'type': 'integer'},
        'iban': {'type': 'string'},
        'status': {'type': 'string'},
        'dateSubmitted': {'type': 'string', 'format': 'date-time'},
        'type': {'type': 'string'},
    },
    'v-security': {
        'allowGetAll': true,
        'publicFilter': ['userId', 'orderId', 'name', 'email', 'phoneNumber', 'country', 'locality', 'address', 'totalPrice', 'paymentMethod', 'giftCardCode', 'giftCardId', 'refundedAmount', 'iban', 'status', 'dateSubmitted', 'type'],
        'publicJsonSchema': false,
    },
    'v-cache': false,
    'v-default-fields': ['id', 'createdIn', 'userId', 'orderId', 'name', 'email', 'phoneNumber', 'country', 'locality', 'address', 'totalPrice', 'paymentMethod', 'giftCardCode', 'giftCardId', 'refundedAmount', 'iban', 'status', 'dateSubmitted', 'type'],
    'v-indexed': ['id', 'createdIn', 'userId', 'orderId', 'name', 'email', 'phoneNumber', 'country', 'locality', 'address', 'totalPrice', 'paymentMethod', 'giftCardCode', 'giftCardId', 'refundedAmount', 'iban', 'status', 'dateSubmitted', 'type'],
}


export const COMMENTS_SCHEMA = {
    'properties': {
        'refundId': {'type': 'string', 'IsRelationship': true},
        'status': {'type': 'string'},
        'comment': {'type': 'string'},
        'visibleForCustomer': {'type': 'boolean'},
        'submittedBy': {'type': 'string', 'IsRelationship': true},
        'dateSubmitted': {'type': 'string', 'format': 'date-time'},
        'type': {'type': 'string'},
    },
    'v-security': {
        'allowGetAll': true,
        'publicFilter': ['refundId', 'status', 'comment', 'visibleForCustomer', 'submittedBy', 'dateSubmitted', 'type'],
        'publicJsonSchema': false,
    },
    'v-cache': false,
    'v-default-fields': ['id', 'createdIn', 'refundId', 'status', 'comment', 'visibleForCustomer', 'submittedBy', 'dateSubmitted', 'type'],
    'v-indexed': ['id', 'createdIn', 'refundId', 'status', 'comment', 'visibleForCustomer', 'submittedBy', 'dateSubmitted', 'type'],
}

export const PRODUCTS_SCHEMA = {
    'properties': {
        'refundId': {'type': 'string'},
        'orderId': {'type': 'string'},
        'userId': {'type': 'string'},
        'imageUrl': {'type': 'string'},
        'skuId': {'type': 'string'},
        'sku': {'type': 'string'},
        'productId': {'type': 'string'},
        'ean': {'type': 'string'},
        'brandId': {'type': 'string'},
        'brandName': {'type': 'string'},
        'skuName': {'type': 'string'},
        'manufacturerCode': {'type': 'string'},
        'unitPrice': {'type': 'integer'},
        'quantity': {'type': 'integer'},
        'totalPrice': {'type': 'integer'},
        'goodProducts': {'type': 'integer'},
        'reasonCode': {'type': 'string'},
        'reason': {'type': 'string'},
        'status': {'type': 'string'},
        'dateSubmitted': {'type': 'string', 'format': 'date-time'},
        'type': {'type': 'string'},
    },
    'v-security': {
        'allowGetAll': true,
        'publicFilter': ['refundId', 'orderId', 'userId', 'imageUrl', 'skuId', 'sku', 'productId', 'ean', 'brandId', 'brandName', 'skuName', 'manufacturerCode', 'unitPrice', 'quantity', 'totalPrice', 'goodProducts', 'reasonCode', 'reason', 'status', 'dateSubmitted', 'type'],
        'publicJsonSchema': false,
    },
    'v-cache': false,
    'v-default-fields': ['id', 'createdIn', 'refundId', 'orderId', 'userId', 'imageUrl', 'sku', 'skuId', 'productId', 'ean', 'brandId', 'brandName', 'skuName', 'manufacturerCode', 'unitPrice', 'quantity', 'totalPrice', 'goodProducts', 'reasonCode', 'reason', 'status', 'dateSubmitted', 'type'],
    'v-indexed': ['id', 'createdIn', 'refundId', 'orderId', 'userId', 'sku', 'skuId', 'skuName', 'status', 'type'],
}

export const HISTORY_SCHEMA = {
    'properties': {
        'refundId': {'type': 'string', 'IsRelationship': true},
        'status': {'type': 'string'},
        'submittedBy': {'type': 'string', 'IsRelationship': true},
        'dateSubmitted': {'type': 'string', 'format': 'date-time'},
        'type': {'type': 'string'},
    },
    'v-security': {
        'allowGetAll': true,
        'publicFilter': ['refundId', 'status', 'submittedBy', 'dateSubmitted', 'type'],
        'publicJsonSchema': false,
    },
    'v-cache': false,
    'v-default-fields': ['id', 'createdIn', 'refundId', 'status', 'submittedBy', 'dateSubmitted', 'type'],
    'v-indexed': ['id', 'createdIn', 'refundId', 'status', 'submittedBy', 'dateSubmitted', 'type'],
}