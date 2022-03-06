const eventsModel = require('../models/eventsModel');
const salesModel = require('../models/salesModel');
const productsSalesModel = require('../models/productsSalesModel');
const productsModel = require('../models/productsModel');
const usersModel = require('../models/usersModel');

const creatSale = async (idUser, response) => {
  try {
    const eventOpen = await eventsModel.verifyEventOpen();
    if (eventOpen) {
      const event = await eventsModel.getEventOpen();
      if (event) {
        const idEvent = event[0].id;
        const date = event[0].date;
        const result = await salesModel.creatSale(idEvent, idUser, date);
        response.status(201).json({
          message: 'Created Sale',
          result,
        });
      } else {
        response.status(404).json({ error: 'Event not Fond' });
      }
    } else {
      response.status(404).json({ error: 'No event Open' });
    }
  } catch (error) {
    response.status(500).json(error);
  }
};

const addProductInSale = async (request, response) => {
  const mail = request.body.mail;
  const idProduct = request.body.idProduct;
  const quantity = request.body.quantité;

  try {
    const User = await usersModel.getIdFromMail(mail);
    const idUser = User[0].id;
    const name = await usersModel.getNameUserfromMail(mail);
    const nameUser = name[0].name;
    const event = await eventsModel.getEventOpen();

    if (event) {
      const saleOpen = await salesModel.getSaleOpen(idUser, event[0].id);

      if (saleOpen) {
        const product = await productsModel.getProduct(idProduct);

        const creatProductInSale = await productsSalesModel.creatProductInSale(
          idProduct,
          product[0].name,
          product[0].ref,
          product[0].genre,
          product[0].taille,
          quantity,
          product[0].prix,
          saleOpen[0].id
        );
        const newQuantity = Number(quantity) + Number(saleOpen[0].nb_produit);
        const newSolde =
          Number(quantity) * Number(product[0].prix) +
          Number(saleOpen[0].solde);
        const addProductInSale = await salesModel.addProduct(
          saleOpen[0].id,
          newQuantity,
          newSolde
        );
        response.status(200).json({ message: 'Add product in sale' });
      } else {
        const newSale = await salesModel.creatSale(
          idUser,
          event[0].id,
          event[0].date,
          nameUser
        );
        const saleOpen = await salesModel.getSaleOpen(idUser, event[0].id);

        const product = await productsModel.getProduct(idProduct);
        const creatProductInSale = await productsSalesModel.creatProductInSale(
          idProduct,
          product[0].name,
          product[0].ref,
          product[0].genre,
          product[0].taille,
          quantity,
          product[0].prix,
          saleOpen[0].id
        );

        const newQuantity = Number(quantity) + Number(saleOpen[0].nb_produit);
        const newSolde =
          Number(quantity) * Number(product[0].prix) +
          Number(saleOpen[0].solde);

        const addProductInSale = await salesModel.addProduct(
          saleOpen[0].id,
          newQuantity,
          newSolde
        );
        response.status(200).json({ message: 'Add product in sale' });
      }
    } else {
      response.status(404).json({ error: 'No event Open' });
    }
  } catch (error) {
    response.status(500).json(error);
  }
};

const getStore = async (request, response) => {
  const mail = request.body.mail;
  try {
    const User = await usersModel.getIdFromMail(mail);

    const idUser = User[0].id;
    const sale = await salesModel.getSaleForStore(idUser);

    if (sale) {
      const products = await productsSalesModel.getProductInSale(sale[0].id);
      if (products) {
        response.status(200).json({ sale, products });
      } else {
        response.status(404).json({ error: 'No products' });
      }
    } else {
      response.status(404).json({ error: 'No store' });
    }
  } catch (error) {
    response.status(500).json(error);
  }
};

const getSaleById = async (request, response) => {
  const id = request.params.id;
  try {
    const sale = await salesModel.getSale(id);
    if (sale) {
      const products = await productsSalesModel.getProductInSale(sale[0].id);
      const event = await eventsModel.getEventById(sale[0].evenement_id);
      const user = await usersModel.getUserById(sale[0].user_id);
      if (products) {
        response.status(200).json({ sale, event, user, products });
      } else {
        response.status(404).json({ error: 'No products' });
      }
    } else {
      response.status(404).json({ error: 'No sale' });
    }
  } catch {
    response.status(500).json(error);
  }
};

const updateRemise = async (request, response) => {
  const id = request.body.id;
  const newRemise = request.body.remise;
  try {
    const sale = await salesModel.getSale(id);
    if (sale) {
      const solde = Number(sale[0].solde);
      const remise = Number(sale[0].remise);
      const total = solde + remise;
      const newSolde = total - Number(newRemise);
      const updateNewRemise = await salesModel.updateRemise(id, newRemise);
      if (updateNewRemise) {
        const updateSolde = await salesModel.updateSolde(id, newSolde);
        if (updateSolde) {
          response.status(200).json({ message: 'Remise and Solde Update' });
        } else {
          response.status(404).json({ error: 'Solde no Update' });
        }
      } else {
        response.status(404).json({ error: 'Remise no update' });
      }
    } else {
      response.status(404).json({ error: 'store not found' });
    }
  } catch (error) {
    response.status(500).json(error);
  }
};

const updateQuantity = async (request, response) => {
  const id = request.body.id;
  const newQuantity = request.body.quantity;
  try {
    const product = await productsSalesModel.getProductByIdInSale(id);
    if (product) {
      const quantity = Number(product[0].quantité);

      const changeQuant = newQuantity - quantity;

      const PU = Number(product[0].prix_unitaire);

      const total = quantity * PU;

      const sale = await salesModel.getSale(product[0].vente_id);

      if (sale) {
        const idVente = sale[0].id;
        const solde = Number(sale[0].solde);
        const newSolde = solde - total + Number(newQuantity) * PU;
        const newQuantSale = Number(sale[0].nb_produit) + changeQuant;
        const updateQuantity = await productsSalesModel.updateQuantity(
          id,
          newQuantity
        );
        if (updateQuantity) {
          const updateSolde = await salesModel.updateSolde(idVente, newSolde);
          const updateQuant = await salesModel.updateQuantitySale(
            idVente,
            newQuantSale
          );
          if (updateSolde && updateQuant) {
            response.status(200).json({ message: 'Quantity and Solde update' });
          } else {
            response.status(404).json({ error: 'solde is not update' });
          }
        } else {
          response.status(404).json({ error: 'quantity is not update' });
        }
      } else {
        response.status(404).json({ error: 'sale no found' });
      }
    } else {
      response.status(404).json({ error: 'product no found' });
    }
  } catch (error) {
    response.status(500).json(error);
  }
};

const deleteProductInStore = async (request, response) => {
  const id = request.body.id;

  try {
    const product = await productsSalesModel.getProductByIdInSale(id);

    if (product) {
      const quantity = Number(product[0].quantité);
      const PU = Number(product[0].prix_unitaire);
      const total = quantity * PU;
      const sale = await salesModel.getSale(product[0].vente_id);

      if (sale) {
        const idVente = sale[0].id;
        const solde = Number(sale[0].solde);
        const newSolde = solde - total;
        const newQuantity = Number(sale[0].nb_produit) - quantity;
        const deleteProduct = await productsSalesModel.deleteProduct(id);

        if (deleteProduct) {
          const updateSolde = await salesModel.updateSolde(idVente, newSolde);
          const updateQuantity = await salesModel.updateQuantitySale(
            idVente,
            newQuantity
          );
          if (updateSolde) {
            response
              .status(200)
              .json({ error: 'Product delete and solde update' });
          } else {
            response.status(404).json({ error: 'solde no update' });
          }
        } else {
          response.status(404).json({ error: 'product no delete' });
        }
      } else {
        response.status(404).json({ error: 'sale no found' });
      }
    } else {
      response.status(404).json({ error: 'product no found' });
    }
  } catch {
    response.status(500).json({ error: 'error' });
  }
};

const validateSale = async (request, response) => {
  const idSale = request.body.id;
  const eventId = request.body.evenement_id;
  const remise = request.body.remise;
  const soldeSale = request.body.solde;
  const userId = request.body.user_id;
  const payType = request.body.pay_type;

  try {
    if (payType === '') {
      response.status(404).json({ error: 'PayType no assigned' });
    } else {
      const user = await usersModel.getUserById(userId);
      if (user) {
        const newNbSale = Number(user[0].nb_vente) + 1;
        const newCAUser = Number(user[0].CA) + Number(soldeSale);
        await usersModel.updateNbSale(userId, newNbSale);
        await usersModel.updateCAUser(userId, newCAUser);
      } else {
        response.status(404).json({ error: 'User not Found' });
      }
      const productsSale = await productsSalesModel.getProductInSale(idSale);
      if (productsSale) {
        await Promise.all(
          productsSale.map(async (productSale) => {
            const product = await productsModel.getProduct(
              productSale.produit_id
            );

            const newQuantity = product[0].quantité - productSale.quantité;

            const newQuantityEvent =
              product[0].quantité_evenement - productSale.quantité;

            await productsModel.updateQuantityProduct(
              productSale.produit_id,
              newQuantity
            );

            await productsModel.updateQuantityProductEvent(
              productSale.produit_id,
              newQuantityEvent
            );
          })
        );
      } else {
        response.status(404).json({ error: 'Products not Found' });
      }
      const event = await eventsModel.getEventById(eventId);
      if (event) {
        const newCA = Number(event[0].CA) + Number(soldeSale);
        const newRemise = Number(event[0].total_remise) + Number(remise);
        const newNbSale = Number(event[0].nb_vente) + 1;
        await eventsModel.updateCA(eventId, newCA);
        await eventsModel.updateRemise(eventId, newRemise);
        await eventsModel.updateNbSale(eventId, newNbSale);
        if (payType === 'CB') {
          const newSoldeCB = Number(event[0].solde_cb) + Number(soldeSale);
          await eventsModel.updateSoldeCB(eventId, newSoldeCB);
        } else if (payType === 'espece') {
          const newSoldeEspece =
            Number(event[0].solde_espece) + Number(soldeSale);
          await eventsModel.updateSoldeEspece(eventId, newSoldeEspece);
        } else if (payType === 'cheque') {
          const newSoldeCheque =
            Number(event[0].solde_cheque) + Number(soldeSale);
          await eventsModel.updateSoldeCheque(eventId, newSoldeCheque);
        }
        await salesModel.updatePayType(idSale, payType);
        const validate = await salesModel.validationSale(idSale);
        if (validate) {
          response.status(200).json({ message: 'Store validated' });
        } else {
          response.status(404).json({ error: 'Store no validated' });
        }
      } else {
        response.status(404).json({ error: 'Event not Found' });
      }
    }
  } catch (error) {
    response.status(500).json(error);
  }
};

const inValidateSale = async (request, response) => {
  const idSale = request.params.id;

  try {
    const sale = await salesModel.getSale(idSale);
    const eventId = sale[0].evenement_id;
    const remise = sale[0].remise;
    const soldeSale = sale[0].solde;
    const userId = sale[0].user_id;
    const payType = sale[0].pay_type;
    const user = await usersModel.getUserById(userId);
    if (user) {
      const newNbSale = Number(user[0].nb_vente) - 1;
      const newCAUser = Number(user[0].CA) - Number(soldeSale);
      await usersModel.updateNbSale(userId, newNbSale);
      await usersModel.updateCAUser(userId, newCAUser);
    } else {
      response.status(404).json({ error: 'User not Found' });
    }
    const productsSale = await productsSalesModel.getProductInSale(idSale);
    if (productsSale) {
      await Promise.all(
        productsSale.map(async (productSale) => {
          const product = await productsModel.getProduct(
            productSale.produit_id
          );

          const newQuantity = product[0].quantité + productSale.quantité;

          const newQuantityEvent =
            product[0].quantité_evenement + productSale.quantité;

          await productsModel.updateQuantityProduct(
            productSale.produit_id,
            newQuantity
          );

          await productsModel.updateQuantityProductEvent(
            productSale.produit_id,
            newQuantityEvent
          );
        })
      );
    } else {
      response.status(404).json({ error: 'Products not Found' });
    }
    const event = await eventsModel.getEventById(eventId);
    if (event) {
      const newCA = Number(event[0].CA) - Number(soldeSale);
      const newRemise = Number(event[0].total_remise) - Number(remise);
      const newNbSale = Number(event[0].nb_vente) - 1;
      await eventsModel.updateCA(eventId, newCA);
      await eventsModel.updateRemise(eventId, newRemise);
      await eventsModel.updateNbSale(eventId, newNbSale);
      if (payType === 'CB') {
        const newSoldeCB = Number(event[0].solde_cb) - Number(soldeSale);
        await eventsModel.updateSoldeCB(eventId, newSoldeCB);
      } else if (payType === 'espece') {
        const newSoldeEspece =
          Number(event[0].solde_espece) - Number(soldeSale);
        await eventsModel.updateSoldeEspece(eventId, newSoldeEspece);
      } else if (payType === 'cheque') {
        const newSoldeCheque =
          Number(event[0].solde_cheque) - Number(soldeSale);
        await eventsModel.updateSoldeCheque(eventId, newSoldeCheque);
      }

      const inValidate = await salesModel.inValidationSaleById(idSale);
      if (inValidate) {
        response.status(200).json({ message: 'Store invalidated' });
      } else {
        response.status(404).json({ error: 'Store no invalidated' });
      }
    } else {
      response.status(404).json({ error: 'Event not Found' });
    }
  } catch (error) {
    response.status(500).json(error);
  }
};

const getSalesByEmail = async (request, response) => {
  const mail = request.body.email;

  try {
    const user = await usersModel.getIdFromMail(mail);
    const userId = user[0].id;

    const sales = await salesModel.getSalesByIdUser(userId);
    if (sales) {
      response.status(200).json(sales);
    } else {
      response.status(404).json({ error: 'Sales not found' });
    }
  } catch {
    response.status(500).json(error);
  }
};

module.exports = {
  creatSale,
  addProductInSale,
  getStore,
  updateRemise,
  updateQuantity,
  deleteProductInStore,
  validateSale,
  getSalesByEmail,
  getSaleById,
  inValidateSale,
};
