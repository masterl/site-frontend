import Vue from 'vue';
import upperFirst from 'lodash.upperfirst';
import camelCase from 'lodash.camelcase';

const filename_from_path = filepath => {
  return filepath
    .split('/')
    .pop()
    .replace(/\.\w+$/, '');
};

export function list_non_base_components () {
  const require_component = require.context(
    '../components/AppComponents', // The relative path of the components folder
    true, // check subfolders?
    /\w+\.js$/ // Filename regular expresion
  );

  const components = [];

  require_component.keys().forEach(file_name => {
    const component_config = require_component(file_name);

    components.push({
      name:   filename_from_path(file_name),
      config: component_config.default || component_config
    });
  });

  return components;
}

export function load_base_components () {
  const require_component = require.context(
    '../components/BaseComponents', // The relative path of the components folder
    true, // check subfolders?
    /Base\w+\.js$/ // Filename regular expresion
  );

  require_component.keys().forEach(file_name => {
    const component_config = require_component(file_name);

    const component_name = upperFirst(
      camelCase(
        filename_from_path(file_name)
      ));

    Vue.component(
      component_name,
      // Look for the component options on `.default`, which will
      // exist if the component was exported with `export default`,
      // otherwise fall back to module's root.
      component_config.default || component_config
    );
  });
}
