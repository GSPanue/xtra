class Route {
  constructor(path, component, name) {
    this.path = path;
    this.component = component;
    this.name = name;
  }

  static set(path, component, name) {
    return new this(path, component, name);
  }

  get() {
    const { path, component, name } = this;

    return {
      path,
      component,
      name
    };
  }
}

export default Route;
