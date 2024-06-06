import { Router } from "express";
import { v4 } from "uuid";

const router = Router();

let data = [];

router.get("/transactions", (req, res) => {
  try {
    const transactionId = req.query?.transactionId?.toString();

    if (transactionId) {
      const itemIndex = data.findIndex(
        ({ transactionId: id }) => id === transactionId
      );
      if (itemIndex === -1) {
        res.status(404).send();
        return;
      }

      res.status(200).send({ ...data[itemIndex] });
    } else {
      res.status(200).send([...data]);
    }
  } catch (err) {
    console.log("Error getting transaction: ", err);
    res.status(500).send(err);
  }
});

router.get("/transactions/:id", (req, res) => {
  const transactionId = req.params.id;
  const transactionIndex = data.findIndex(
    ({ transactionId: id }) => id === transactionId
  );
  if (transactionIndex === -1) {
    res.status(404).send("not found");
    return;
  }

  res.status(200).send({ ...data[transactionIndex] });
});

router.post("/transactions", (req, res) => {
  const newTransaction = {
    transactionId: v4(),
    ...req.body,
  };

  data.push(newTransaction);
  res.status(200).send({ ...newTransaction });
});

router.patch("/transactions/:id", (req, res) => {
  const transactionId = req.params.id;
  const transactionIndex = data.findIndex(
    ({ transactionId: id }) => id === transactionId
  );
  if (transactionIndex === -1) {
    res.status(404).send("Item not found");
    return;
  }

  data[transactionIndex] = {
    ...data[transactionIndex],
    ...req.body,
  };

  res.status(200).send({ ...data[transactionIndex] });
});

router.delete("/transactions/:id", (req, res) => {
  const transactionId = req.params.id;
  const transactionIndex = data.findIndex(
    ({ transactionId: id }) => id === transactionId
  );
  if (transactionIndex === -1) {
    res.status(404).send("Item not found");
    return;
  }

  data = data.filter(({ transactionId: id }) => transactionId !== id);
  res.status(200).send();
});

export default router;
