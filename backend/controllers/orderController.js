import asyncHandler from "../middleware/asyncHandler.js";
import Order from "../models/orderModel.js";

//@desc Create new order
//@ post /api/orders
//@access Private

const addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error("no order items");
  } else {

    const order = new Order({
        orderItems : orderItems.map((x) => ({
            ...x,
            product:x._id,
            _id:undefined
        })),
        user:req.user_id,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,


    })
    const createdOrder = await order.save();

    res.status(201).json(createdOrder);


  }
});

//@desc get logged in user Order
//@ post /api/orders/myorders
//@access Private

const getMyOrders = asyncHandler(async (req, res) => {

    const orders = await Order.find({user:req.user_id});
    res.status.json(orders);
  
});

//@desc get order by ID
//@ get /api/orders/myorders/:id
//@access Private/Admin

const getOrderById = asyncHandler(async (req, res) => {

    const order = await Order.findById(req.params.id).populate('user','name email');

    if(order){
        res.status(200).json(order)
    } else{
        res.status(404)
        throw new Error('Order not found');
    }


  
});

//@desc Update order to paid
//@ PUT /api/orders/:id/pay
//@access Private

const updateOrderToPaid = asyncHandler(async (req, res) => {
  res.send("update order to paid");
});

//@desc Update order to delivered
//@ GET /api/orders/:id/deliver
//@access Private/Admin

const updateOrderToDelivered = asyncHandler(async (req, res) => {
  res.send("update to delivered");
});

//@desc Get all orders
//@ GET /api/orders
//@access Private/Admin

const getOrders = asyncHandler(async (req, res) => {
  res.send("get all orders");
});
export {
  addOrderItems,
  getMyOrders,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getOrders,
};
