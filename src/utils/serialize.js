/*
  Features:

  Deep traversal (arrays, objects, nested structures)
  Converts:
  ObjectId -> string
  Date -> ISO string
  Decimal128 -> string
  Buffer -> base64 string
  BigInt -> string (JSON can’t handle BigInt)
  Map -> plain object
  Set -> array
  BSON Long / Int32 (detected by _bsontype) -> Number (if safe) or string
  Skips undefined values
  Preserves null, booleans, numbers, strings
  Prevents circular reference crashes (throws with a useful message)
  Creates plain objects (no prototype leakage)
 */

let MongooseTypes = {};
try {
  // Optional: only if mongoose is installed in the environment
  const mongoose = require('mongoose');
  MongooseTypes = mongoose?.Types || {};
} catch (_) {
  // ignore if mongoose not present
}

function isObjectId(val) {
  return (
    val &&
    typeof val === 'object' &&
    (val instanceof MongooseTypes.ObjectId ||
      val._bsontype === 'ObjectId' ||
      (val.constructor && val.constructor.name === 'ObjectId'))
  );
}

function isDecimal128(val) {
  return (
    val &&
    typeof val === 'object' &&
    (val instanceof MongooseTypes.Decimal128 ||
      val._bsontype === 'Decimal128' ||
      (val.constructor && val.constructor.name === 'Decimal128'))
  );
}

function isBsonLong(val) {
  return val && typeof val === 'object' && val._bsontype === 'Long';
}

function isBsonInt32(val) {
  return val && typeof val === 'object' && val._bsontype === 'Int32';
}

function toSafeNumberOrString(bsonNumeric) {
  // bson long/int32 objects often expose toNumber / toString
  if (typeof bsonNumeric.toNumber === 'function') {
    const n = bsonNumeric.toNumber();
    // If it's outside JS safe range, return as string to avoid precision loss
    if (Number.isSafeInteger(n)) return n;
    return bsonNumeric.toString();
  }
  if (typeof bsonNumeric.valueOf === 'function') {
    const v = bsonNumeric.valueOf();
    if (typeof v === 'number' && Number.isSafeInteger(v)) return v;
  }
  if (typeof bsonNumeric.toString === 'function') return bsonNumeric.toString();
  return String(bsonNumeric);
}

/**
 * Recursively convert a value so it's JSON-serializable for Next.js / React.
 * Avoids mutating the input. Throws on circular references.
 */
function serialize(value, seen = new WeakSet()) {
  // Primitives & null
  if (value === null || typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
    return value;
  }

  if (typeof value === 'bigint') {
    return value.toString();
  }

  if (value === undefined) {
    // Skip undefined; caller adding this into an object should just omit the key
    return undefined;
  }

  if (value instanceof Date) {
    return value.toISOString();
  }

  if (Buffer.isBuffer(value)) {
    return value.toString('base64');
  }

  if (isObjectId(value)) {
    // String form (hex) is typically what's desired
    return value.toString();
  }

  if (isDecimal128(value)) {
    return value.toString();
  }

  if (isBsonLong(value) || isBsonInt32(value)) {
    return toSafeNumberOrString(value);
  }

  if (Array.isArray(value)) {
    return value.map((item) => serialize(item, seen)).filter((v) => v !== undefined); // remove undefined entries
  }

  if (value instanceof Set) {
    return Array.from(value).map((v) => serialize(v, seen));
  }

  if (value instanceof Map) {
    const obj = Object.create(null);
    for (const [k, v] of value.entries()) {
      const sv = serialize(v, seen);
      if (sv !== undefined) obj[k] = sv;
    }
    return obj;
  }

  if (typeof value === 'object') {
    if (seen.has(value)) {
      throw new Error('serialize(): Circular reference detected.');
    }
    seen.add(value);

    const output = Object.create(null);
    for (const [k, v] of Object.entries(value)) {
      const sv = serialize(v, seen);
      if (sv !== undefined) {
        output[k] = sv;
      }
    }
    seen.delete(value);
    return output;
  }

  // Functions, symbols, etc. are skipped (return undefined).
  return undefined;
}

/**
 * Public helper for documents or arrays of documents.
 * Strips undefined keys at the top level as well.
 */
function toSerializable(input) {
  const result = serialize(input);
  return result;
}

module.exports = {
  toSerializable,
  serialize, // export if you want granular use
};
