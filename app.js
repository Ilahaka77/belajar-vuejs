// var data_product = {
//     maximum: 100000,
//     products: [
//         {
//             "id": "001",
//             "name": "T-Shirt Gintama",
//             "description": "Baju pria dengan gambar character dari seri Gintama. Ukuran bisa dipilih sesuai keinginan.",
//             "price": "100000",
//             "image": "https://i.pinimg.com/originals/d8/22/c3/d822c3041af5cd2b99eda93984cf510d.jpg"
//         },
//         {
//             "id": "002",
//             "name": "T-Shirt Naruto",
//             "description": "Baju pria dengan gambar character dari seri Naruto. Ukuran bisa dipilih sesuai keinginan.",
//             "price": "90000",
//             "image": "https://ae01.alicdn.com/kf/H16b36c6390754de2a37b19b4f242a274L/Hip-Hop-Kasual-Wanita-Pria-T-Shirt-Anime-Naruto-Akatsuki-Lengan-Pendek-Lucu-3D-Gambar-T.jpg_640x640.jpg"
//         },
//         {
//             "id": "003",
//             "name": "T-Shirt Dragon Ball",
//             "description": "Baju pria dengan gambar character dari seri Dragon Ball. Ukuran bisa dipilih sesuai keinginan.",
//             "price": "150000",
//             "image": "https://id-test-11.slatic.net/p/9f4debf6b37be2362de57b7430937a85.jpg_720x720q80.jpg_.webp"
//         },
//         {
//             "id": "004",
//             "name": "T-Shirt One Piece",
//             "description": "Baju pria dengan gambar character dari seri One Piece. Ukuran bisa dipilih sesuai keinginan.",
//             "price": "120000",
//             "image": "https://s2.bukalapak.com/img/781167294/w-1000/T_SHIRT_ONE_PIECE_GLOW_IN_THE_DARK_31_BLACK___________C94_Pr.jpg"
//         },
//     ]
// };

var app = new Vue({
    el: '#app',
    data: {
        maximum: 50,
        products: null,
        cart: [],
        style: {
            label: ['font-weight-bold', 'mr-2'],
            inputSize: 60,
            slideStatus: true,
        }

    },
    methods: {
        before: function(el){
            el.className = 'd-none';
        },
        enter: function(el){
            var delay = el.dataset.index * 100;
            setTimeout(function(){
                el.className = 'col d-flex animate__animated animate__fadeInRight';
            }, delay);

        },
        leave: function(el){
            var delay = el.dataset.index * 100;
            setTimeout(function(){
                el.className = 'col d-flex animate__animated animate__fadeOutRight'
            }, delay);
        },
        addItem: function(data){
            var productIndex;
            var productExist = this.cart.filter(function(item, index){
                if(item.product.id == Number(data.id)){
                    productIndex = index;
                    return true;
                }else{
                    return false;
                }
            });

            if(productExist.length){
                this.cart[productIndex].qty++;
            }else{
                this.cart.push({product: data, qty: 1});
            }
        }
    },
    filters: {
        currencyFormat: function(value){
            return 'Rp '+ Number.parseFloat(value).toFixed(2); 
        }
    },
    computed: {
        sliderState: function(){
            return this.style.slideStatus ? 'd-flex' : 'd-none';
        }
    },
    mounted: function(){
        fetch('https://hplussport.com/api/products/order/price')
        .then(response => response.json())
        .then(data => {
            this.products = data;
        })
    }
});