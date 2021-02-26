// Copyright (c) 2021 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

import * as damlTypes from '@daml/types';

export interface TemplateMeta {
  template: damlTypes.Template<object>,
  choices: {[s: string]: ChoiceMeta},
};

export interface ChoiceMeta {
  argument: Meta,
  result: Meta
};

/**
 * Interface for companion objects of serializable types. Its main purpose is
 * to serialize and deserialize values between raw JSON and typed values.
 *
 * @typeparam T The template type.
 */
export interface Meta {
  tag: string;
  parameters: Meta[];
  items: undefined | string[] | { [P : string]: Meta }; // dependent typing; probably should be combined with tag.
}

/**
 * Companion obect of the [[Unit]] type.
 */
export const Unit: Meta = {
  tag: 'Unit',
  parameters: [],
}

/**
 * Companion object of the [[Bool]] type.
 */
export const Bool: Meta = {
  tag: 'Bool',
  parameters: [],
}

/**
 * Companion object of the [[Int]] type.
 */
export const Int: Meta = {
  tag: 'Int',
  parameters: [],
}

/**
 * Companion function of the [[Numeric]] type.
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const Numeric = (r: number): Meta =>
  ({
    tag: 'Numeric', // possible issue of lost info here?
    parameters: [r],
  })

/**
 * Companion object of the [[Decimal]] type.
 */
export const Decimal: Meta = Numeric(10)

/**
 * The counterpart of Daml's `Text` type.
 */
export type Text = string;

/**
 * Companion object of the [[Text]] type.
 */
export const Text: Meta = {
  tag: 'Text',
  parameters: [],
}

/**
 * The counterpart of Daml's `Time` type.
 *
 * We represent `Times`s as strings with format `YYYY-MM-DDThh:mm:ss[.ssssss]Z`.
 */
export type Time = string;

/**
 * Companion object of the [[Time]] type.
 */
export const Time: Meta = {
  tag: 'Time',
  parameters: [],
}

/**
 * The counterpart of Daml's `Party` type.
 *
 * We represent `Party`s as strings matching the regular expression `[A-Za-z0-9:_\- ]+`.
 */
export type Party = string;

/**
 * Companion object of the [[Party]] type.
 */
export const Party: Meta = {
  tag: 'Party',
  parameters: [],
}

/**
 * Companion object of the [[List]] type.
 */
export const List = (t: Meta): Meta => ({
  tag: 'List',
  parameters: [t],
});

/**
 * The counterpart of Daml's `Date` type.
 *
 * We represent `Date`s as strings with format `YYYY-MM-DD`.
 */
export type Date = string;

/**
 * Companion object of the [[Date]] type.
 */
export const Date: Meta = {
  tag: 'Date',
  parameters: [],
}

/**
 * Companion object of the [[ContractId]] type.
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const ContractId = (_t: Meta): Meta => ({
  tag: 'ContractId',
  parameters: [_t],
});

/**
 * This class does the actual work behind the [[Optional]] companion function.  In addition to
 * implementing the [[Meta]] interface it also stores the [[Meta]] instance of the
 * payload of the [[Optional]] and uses it to provide a decoder for the [[OptionalInner]] type.
 *
 * @typeparam T The type of the optionally present value.
 */
class OptionalWorker implements Meta {
  tag: string;
  parameters: Meta[];

  constructor(payload: Meta) {
    this.tag = 'Optional';
    this.parameters = [payload];
  }
}

/**
 * Companion function of the [[Optional]] type.
 */
export const Optional = (t: Meta): Meta =>
  new OptionalWorker(t);

/**
 * Companion object of the [[TextMap]] type.
 */
export const TextMap = (t: Meta): Meta => ({
  tag: 'TextMap',
  parameters: [ t ],
});

/**
 * Companion function of the [[GenMap]] type.
 */
export const Map = (kd: Meta, vd: Meta): Meta => ({
  tag: 'Map',
  parameters: [kd, vd],
});
