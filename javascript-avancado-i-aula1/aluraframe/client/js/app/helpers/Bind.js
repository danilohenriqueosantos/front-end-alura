class Bind {

    contructor(model, view, props) {

        let proxy = ProxyFactory.create(model, props, model =>
            view.update(model));

        view.update(model);

        return proxy;
    }

}