// Copyright (c) 2021 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

package com.daml.testing;

import static org.junit.jupiter.api.Assertions.assertEquals;

import com.daml.ledger.javaapi.data.Numeric;
import com.daml.ledger.javaapi.data.Party;
import com.daml.ledger.javaapi.data.Record;
import java.math.BigDecimal;
import org.junit.jupiter.api.Test;
import org.junit.platform.runner.JUnitPlatform;
import org.junit.runner.RunWith;
import test.decimalmod.Box;

@RunWith(JUnitPlatform.class)
public class DecimalTestForAll {

  private final String[] goodValues = {
    "-9999999999999999999999999999.9999999999",
    "-1.0",
    "0.0",
    "1.0",
    "3.1415926536",
    "42.0",
    "9999999999999999999999999999.9999999999",
  };

  @Test
  void decimal2Value2Decimal() {
    for (String s : goodValues) {
      Box b = new Box(new BigDecimal(s), "alice");
      assertEquals(Box.fromValue(b.toValue()), b);
    }
  }

  @Test
  void value2Decimal2value() {
    Record.Field partyField = new Record.Field("party", new Party("alice"));
    for (String s : goodValues) {
      Record record = new Record(new Record.Field("x", new Numeric(new BigDecimal(s))), partyField);
      assertEquals(Box.fromValue(record).toValue(), record);
    }
  }
}
