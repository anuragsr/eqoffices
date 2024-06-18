(function () {

    // slider configuration goes here
    var imgObj = {
        // path of image folder, currently it is at /static/image/
        "PATH": "static/image/",

        // names of image files, just add the name of images here and slider will show image with bullet point
        "images": [
            "s4.jpg",
            "s1.jpg",
            "s3.jpg",
            "s2.jpg"
        ],
        // if you want slider to change automatically
        "autoChange": true,
        // duration between each change in miliseconds
        "sliderDuration": 5000
    }



    // main slider Object
    var sliderObj = function () {
        var self = this;
        // active element
        this._active = 0;

        // image parent element
        this.imgElement = document.getElementById('image-wrapper');
        // bullet parent
        this.bulletElement = document.getElementById('bullets');

        // getting first image child, for temlating
        this.imgChildElement = this.imgElement.children[0];
        // getting first bullet child, templating
        this.bulletChildElement = this.bulletElement.children[0];
        // image child array to store image nodes
        this.imgChild = [];

        // bullet child array to store bullet nodes
        this.bulletChild = [];

        // crate document fragment to append everything at once
        // save on performance
        this.imgFragment = document.createDocumentFragment();
        this.bulletFragment = document.createDocumentFragment();

        // method to attach events to node, and add node to dom
        // both image and bullet child node
        this.init = function(index){
            // storing element at index 
            // both child and bullet

            // cloning image child element
            this.imgChild[index] = this.imgChildElement.cloneNode(false);

            // setting its src
            this.imgChild[index].src = imgObj.PATH + imgObj.images[index];
            // setting id, irrelevant 
            //this.imgChild[index].setAttribute('id', `slider_${index}`);

            // cloning bullet child elemenr
            // cloning is important simple assignment will get us single node
            // despite multple append, because mutable
            this.bulletChild[index] = this.bulletChildElement.cloneNode(false);

            // hide if the index is not active
            if (index !== this._active) {
                this.imgChild[index].classList.add('hide');
                this.bulletChild[index].classList.remove('fill');
            } else {
                // cleaning the DOM when index is zero
                // DOM is just for templating
                // repaing is required
                this.clean();
            }

            // attach click event to bullets
            var changeTo = this.changedTo;
            this.bulletChild[index].addEventListener('click', function (event) {
                changeTo.call(self, event, index);
            });

            // setting bullet child id, irrelevant
            //this.bulletChild[index].setAttribute("id", `bullet_${index}`);

            // appending image and bullet to DOM fragment
            this.imgFragment.appendChild(this.imgChild[index]);
            this.bulletFragment.appendChild(this.bulletChild[index]);

            // document.getElementById("image-wrapper")=this.imgElement;

        };
        this.clean = function(){
            // cleaning DOM for repaint
            this.imgElement.innerHTML = '';
            this.bulletElement.innerHTML = '';
        };
        this.changedTo = function(event, index){

            if (event) {
                // will only be availble when manually clicked
                // kill timer here
                clearInterval(this.timeInterval);

            }

            // take slider to destination

            // hiding the current active image
            this.imgChild[this._active].classList.add('hide');

            // hiding the current active bullet
            this.bulletChild[this._active].classList.remove('fill');

            // change the active state
            this._active = index;

            // show the current active img
            this.imgChild[this._active].classList.remove('hide');

            // show the current active bullet
            this.bulletChild[this._active].classList.add('fill');
        };
        this.timer = function(){
            var index, self = this;
            this.timeInterval = setInterval(function(){
                // so that index does not bound
                index = (self._active + 1) % imgObj["images"].length;
                self.changedTo(null, index);
            },imgObj.sliderDuration);
        };
        this.append = function(){
            // append just once instead of five times to save of performance
            this.imgElement.appendChild(this.imgFragment);
            this.bulletElement.appendChild(this.bulletFragment);

        }

    };

    // initiating slider here
    var Slider = new sliderObj();
    for (var i = 0, len = imgObj.images.length; i < len; i++) {
        //    attaching all images and bullets to DOM and object
        Slider.init(i);
    }

    // append the yield to DOM 
    Slider.append();

    // kickstart timeer
    if (imgObj.autoChange) {
        Slider.timer();
    }



})()


/*(function () {

    // slider configuration goes here
    const imgObj = {
        // path of image folder, currently it is at /static/image/
        "PATH": "/static/image/",

        // names of image files, just add the name of images here and slider will show image with bullet point
        "images": [
            "s4.jpg",
            "s1.jpg",
            "s3.jpg",
            "s2.jpg"
        ],
        // if you want slider to change automatically
        "autoChange": true,
        // duration between each change in miliseconds
        "sliderDuration": 5000
    }



    // main slider Object
    let sliderObj = function () {
        // active element
        this._active = 0;

        // image parent element
        this.imgElement = document.getElementById('image-wrapper');
        // bullet parent
        this.bulletElement = document.getElementById('bullets');

        // getting first image child, for temlating
        this.imgChildElement = this.imgElement.children[0];
        // getting first bullet child, templating
        this.bulletChildElement = this.bulletElement.children[0];
        // image child array to store image nodes
        this.imgChild = [];

        // bullet child array to store bullet nodes
        this.bulletChild = [];

        // crate document fragment to append everything at once
        // save on performance
        this.imgFragment = document.createDocumentFragment();
        this.bulletFragment = document.createDocumentFragment();

        // method to attach events to node, and add node to dom
        // both image and bullet child node
        this.init = (index) => {
            // storing element at index 
            // both child and bullet

            // cloning image child element
            this.imgChild[index] = this.imgChildElement.cloneNode(false);

            // setting its src
            this.imgChild[index].src = imgObj.PATH + imgObj.images[index];
            // setting id, irrelevant 
            this.imgChild[index].setAttribute('id', `slider_${index}`);

            // cloning bullet child elemenr
            // cloning is important simple assignment will get us single node
            // despite multple append, because mutable
            this.bulletChild[index] = this.bulletChildElement.cloneNode(false);

            // hide if the index is not active
            if (index !== this._active) {
                this.imgChild[index].classList.add('hide');
                this.bulletChild[index].classList.remove('fill');
            } else {
                // cleaning the DOM when index is zero
                // DOM is just for templating
                // repaing is required
                this.clean();
            }

            // attach click event to bullets
            let changeTo = this.changedTo;
            this.bulletChild[index].addEventListener('click', function (event) {
                changeTo.call(this, event, index);
            });

            // setting bullet child id, irrelevant
            this.bulletChild[index].setAttribute("id", `bullet_${index}`);

            // appending image and bullet to DOM fragment
            this.imgFragment.appendChild(this.imgChild[index]);
            this.bulletFragment.appendChild(this.bulletChild[index]);

            // document.getElementById("image-wrapper")=this.imgElement;

        };
        this.clean = () => {
            // cleaning DOM for repaint
            this.imgElement.innerHTML = '';
            this.bulletElement.innerHTML = '';
        };
        this.changedTo = (event, index) => {

            if (event) {
                // will only be availble when manually clicked
                // kill timer here
                clearInterval(this.timeInterval);

            }

            // take slider to destination

            // hiding the current active image
            this.imgChild[this._active].classList.add('hide');

            // hiding the current active bullet
            this.bulletChild[this._active].classList.remove('fill');

            // change the active state
            this._active = index;

            // show the current active img
            this.imgChild[this._active].classList.remove('hide');

            // show the current active bullet
            this.bulletChild[this._active].classList.add('fill');
        };
        this.timer = () => {
            let index;
            this.timeInterval = setInterval(() => {
                // so that index does not bound
                index = (this._active + 1) % imgObj["images"].length;
                this.changedTo(null, index);
            },imgObj.sliderDuration);
        };
        this.append = () => {
            // append just once instead of five times to save of performance
            this.imgElement.appendChild(this.imgFragment);
            this.bulletElement.appendChild(this.bulletFragment);

        }

    };

    // initiating slider here
    let Slider = new sliderObj();
    for (let i = 0, len = imgObj.images.length; i < len; i++) {
        //    attaching all images and bullets to DOM and object
        Slider.init(i);
    }

    // append the yield to DOM 
    Slider.append();

    // kickstart timeer
    if (imgObj.autoChange) {
        Slider.timer();
    }



})()*/