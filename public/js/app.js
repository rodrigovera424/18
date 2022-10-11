// eslint-disable-next-line no-undef
const socket = io();

// eslint-disable-next-line no-undef
$(function () {
  socket.on("socketConnected", () => {
    socket.emit("productListRequest");
    socket.emit("chatMessagesRequest");
  });
  // eslint-disable-next-line no-undef
  const productForm = $("#formNewProduct");
  // eslint-disable-next-line no-undef
  const productContainer = $("#productList");

  productForm.submit((event) => {
    event.preventDefault();

    const newProduct = {
      title: productForm[0][0].value,
      price: productForm[0][1].value,
      thumbnail: productForm[0][2].value,
    };

    socket.emit("addNewProduct", newProduct);
    productForm.trigger("reset");
  });

  socket.on("updateProductList", productListHandler);

  async function productListHandler(all) {
    const productLayout = await fetch("views/layouts/productItem.hbs");
    const layoutText = await productLayout.text();
    // eslint-disable-next-line no-undef
    const compiledHbsTemplate = Handlebars.compile(layoutText);
    const html = compiledHbsTemplate({ all });
    productContainer.empty().append(html);
  }

  // ----------* CHAT ROOM SECTION *----------//
  // eslint-disable-next-line no-undef
  const chatForm = $("#messages");
  // eslint-disable-next-line no-undef
  const chatContainer = $("#menssageContainer");

  chatForm.submit((event) => {
    event.preventDefault();

    const newMessage = {
      email: chatForm[0][0].value,
      messageText: chatForm[0][1].value,
    };

    socket.emit("addNewMessage", newMessage);
    chatForm.trigger("reset");
  });

  socket.on("updateChatRoom", chatRoomHandler);

  async function chatRoomHandler(allMessages) {
    const chatLayout = await fetch("views/layouts/chatMessages.hbs");
    const layoutText = await chatLayout.text();
    // eslint-disable-next-line no-undef
    const compiledHbsTemplate = Handlebars.compile(layoutText);
    const html = compiledHbsTemplate({ allMessages });
    chatContainer.empty().append(html);
  }
});
