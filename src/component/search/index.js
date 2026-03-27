import { data } from '../data';
import { state } from '../state';
import { bookmark } from '../bookmark';
import { groupAndBookmark } from '../groupAndBookmark';
import { searchEnginePreset } from '../searchEnginePreset';


import { Button } from '../button';
import { Control_text } from '../control/text';

import { node } from '../../utility/node';
import { trimString } from '../../utility/trimString';
import { isValidString } from '../../utility/isValidString';

import { isAiPrefix, stripAiPrefix, buildPerplexityUrl } from '../../utility/search-prefix-router';

import './index.css';

export const Search = function () {

  this.element = {
    search: node('div|class:search'),
    form: node('form|class:search-form,action,method:get'),
    submit: node('input|type:submit,value:Search,class:is-hidden'),
    input: new Control_text({
      object: state.get.current(),
      path: 'header.search.string',
      id: 'header-search-string',
      value: '',
      placeholder: 'Search Bookmarks or',
      labelText: 'Search',
      classList: ['search-input'],
      srOnly: true,
      action: () => {
        this.state();
        this.performSearch();
      }
    }),
    clear: new Button({
      text: 'Clear search',
      srOnly: true,
      iconName: 'cross',
      style: ['link', 'line'],
      title: 'Clear search',
      classList: ['search-clear'],
      func: () => {
        this.element.input.text.value = '';
        this.state();
        this.performSearch();
      }
    })
  };

  // IME composition guard
  this.composing = false;
  this.element.input.text.addEventListener('compositionstart', () => { this.composing = true; });
  this.element.input.text.addEventListener('compositionend', () => { this.composing = false; this.state(); this.performSearch(); });

  this.state = () => {

    const raw = this.element.input.text.value || '';

    // If input starts with '/', suppress bookmark filtering (covers '/ai' and any slash command)
    if (raw.startsWith('/')) {

      state.get.current().search = false;

    } else if (isValidString(trimString(raw))) {

      state.get.current().search = true;

    } else {

      state.get.current().search = false;

    }

    data.save();

  };

  this.placeholder = () => {

    let placeholder = '';

    if (state.get.current().bookmark.show) {
      placeholder = 'Find bookmarks or search';
    } else {
      placeholder = 'Search';
    }

    switch (state.get.current().header.search.engine.selected) {

      case 'custom':

        if (isValidString(state.get.current().header.search.engine.custom.name)) {

          placeholder = placeholder + ' ' + state.get.current().header.search.engine.custom.name;

        }

        break;

      default:

        placeholder = placeholder + ' ' + searchEnginePreset[state.get.current().header.search.engine.selected].name;

        break;

    }

    // Add hint for Perplexity routing
    placeholder = placeholder + ' — Type /ai to ask Perplexity';

    this.element.input.text.placeholder = placeholder;

  };

  this.engine = {};

  this.engine.set = () => {

    switch (state.get.current().header.search.engine.selected) {

      case 'custom':

        if (isValidString(state.get.current().header.search.engine.custom.queryName) && isValidString(state.get.current().header.search.engine.custom.url)) {

          this.element.input.text.name = state.get.current().header.search.engine.custom.queryName;

          this.element.form.setAttribute('action', state.get.current().header.search.engine.custom.url);

        } else {

          this.element.input.text.name = '';

          this.element.form.setAttribute('action', '');

        }

        break;

      default:

        this.element.input.text.name = 'q';

        this.element.form.setAttribute('action', searchEnginePreset[state.get.current().header.search.engine.selected].url);

        break;

    }

    if (state.get.current().header.search.newTab) {
      this.element.form.setAttribute('target', '_blank');
    }

  };

  this.engine.bind = () => {
    // no-op
  };

  this.performSearch = () => {

    const html = document.querySelector('html');

    if (state.get.current().search) {

      html.classList.add('is-search');

      const searchString = trimString(this.element.input.text.value).toLowerCase();

      bookmark.all.forEach((item) => {

        item.items.forEach((item) => {

          item.searchMatch = false;

          let matchUrl = isValidString(item.url) && item.url.toLowerCase().includes(searchString);

          let matchName = isValidString(item.display.name.text) && trimString(item.display.name.text).toLowerCase().includes(searchString);

          if (matchUrl || matchName) {
            item.searchMatch = true;
          }

        });

      });

    } else {

      html.classList.remove('is-search');

      this.clearSearch();

    }

    groupAndBookmark.render();

  };

  this.clearSearch = () => {

    bookmark.all.forEach((item) => {

      item.items.forEach((item) => {

        delete item.searchMatch;

      });

    });

    data.save();

  };

  this.assemble = () => {

    this.element.input.text.type = 'Search';

    // Intercept submit to support /ai prefix routing
    this.element.form.addEventListener('submit', (e) => {
      const raw = this.element.input.text.value || '';
      if (isAiPrefix(raw)) {
        e.preventDefault();
        if (this.composing) { return; }
        const q = stripAiPrefix(raw);
        const url = buildPerplexityUrl(q);
        // Force current tab regardless of header.search.newTab
        window.location.assign(url);
      }
      // else let native submit proceed
    });

    this.element.form.appendChild(this.element.input.text);

    this.element.form.appendChild(this.element.submit);

    this.element.form.appendChild(this.element.clear.button);

    this.element.search.appendChild(this.element.form);

  };

  this.search = () => {

    return this.element.search;

  };

  this.resultCount = () => {

    const count = { total: 0, group: [] };

    bookmark.all.forEach((item, i) => {

      count.group.push({
        bookmarkCount: item.items.length,
        searchMatch: 0
      });

      const groupIndex = i;

      item.items.forEach((item) => {

        if (item.searchMatch) { count.group[groupIndex].searchMatch++; }

      });

      count.total = count.total + count.group[groupIndex].searchMatch;

    });

    return count;

  };

  this.update = {};

  this.update.style = () => {

    const html = document.querySelector('html');

    if (state.get.current().theme.header.search.opacity < 40) {

      html.classList.add('is-header-search-opacity-low');

    } else {

      html.classList.remove('is-header-search-opacity-low');

    }

  };

  this.assemble();

  this.placeholder();

  this.engine.set();

  this.clearSearch();

  this.update.style();

};
