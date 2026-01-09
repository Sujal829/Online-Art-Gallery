import React from 'react';
import {  motion  } from 'framer-motion';
import {  User, Mail, ShoppingBag, Clock, CheckCircle, XCircle  } from 'lucide-react';
import Navbar from '@/components/Navbar';
import {  useAuth  } from '@/context/AuthContext';
import ordersData from '@/data/orders.json';
import productsData from '@/data/products.json';
import {  Badge  } from '@/components/ui/badge';

const Profile = () => {
  const { user } = useAuth();
  
  const orders = ordersData.orders.filter((o) => o.userId === user?.id);
  const products = productsData.products;

  const getProductById = (productId) => {
    return products.find((p) => p.id === productId);
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Completed':
        return <CheckCircle className="h-4 w-4 text-gallery-success" />;
      case 'Pending':
        return <Clock className="h-4 w-4 text-accent" />;
      case 'Cancelled':
        return <XCircle className="h-4 w-4 text-destructive" />;
    }
  };

  const getStatusVariant = (status) => {
    switch (status) {
      case 'Completed':
        return 'default';
      case 'Pending':
        return 'secondary';
      case 'Cancelled':
        return 'destructive';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-card rounded-lg p-6 shadow-card h-fit"
          >
            <div className="text-center">
              <img
                src={user?.avatar}
                alt={user?.name}
                className="h-24 w-24 rounded-full object-cover mx-auto ring-4 ring-accent/20"
              />
              <h1 className="font-heading text-xl font-semibold mt-4">{user?.name}</h1>
              <div className="flex items-center justify-center gap-1 text-muted-foreground mt-1">
                <Mail className="h-4 w-4" />
                <span className="text-sm">{user?.email}</span>
              </div>
              <Badge className="mt-3 capitalize">{user?.role}</Badge>
            </div>

            <div className="mt-6 pt-6 border-t border-border">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Total Orders</span>
                <span className="font-medium">{orders.length}</span>
              </div>
              <div className="flex items-center justify-between text-sm mt-2">
                <span className="text-muted-foreground">Total Spent</span>
                <span className="font-medium">
                  Rs:-{orders.reduce((sum, o) => sum + o.totalAmount, 0).toLocaleString()}
                </span>
              </div>
            </div>
          </motion.div>

          {/* Orders Section */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <h2 className="font-heading text-2xl font-semibold mb-6">Order History</h2>

              {orders.length === 0 ? (
                <div className="bg-card rounded-lg p-8 text-center shadow-card">
                  <ShoppingBag className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">No orders yet. Start collecting!</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {orders.map((order, index) => (
                    <motion.div
                      key={order.orderId}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-card rounded-lg p-6 shadow-card"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <p className="font-medium">Order #{order.orderId}</p>
                          <p className="text-sm text-muted-foreground">{order.date}</p>
                        </div>
                        <Badge variant={getStatusVariant(order.status)} className="flex items-center gap-1">
                          {getStatusIcon(order.status)}
                          {order.status}
                        </Badge>
                      </div>

                      <div className="space-y-3">
                        {order.items.map((item) => {
                          const product = getProductById(item.productId);
                          return product ? (
                            <div key={item.productId} className="flex items-center gap-4">
                              <img
                                src={product.image}
                                alt={product.title}
                                className="w-12 h-16 object-cover rounded"
                              />
                              <div className="flex-1">
                                <p className="font-medium">{product.title}</p>
                                <p className="text-sm text-muted-foreground">
                                  Qty: {item.quantity} × Rs:-{item.price.toLocaleString()}
                                </p>
                              </div>
                            </div>
                          ) : null;
                        })}
                      </div>

                      <div className="mt-4 pt-4 border-t border-border flex justify-between">
                        <span className="text-muted-foreground">Total</span>
                        <span className="font-heading font-semibold">
                          Rs:-{order.totalAmount.toLocaleString()}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
