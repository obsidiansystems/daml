// Copyright (c) 2021 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

package com.daml.ledger.api.testtool.infrastructure

object Errors {

  sealed abstract class FrameworkException(message: String, cause: Throwable)
      extends RuntimeException(message, cause)

  final class ParticipantConnectionException(cause: Throwable)
      extends FrameworkException("Could not connect to the participant.", cause)

}
