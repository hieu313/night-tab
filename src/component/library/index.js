import { message } from '../message';

import { state } from '../state';
import { bookmark } from '../bookmark';
import { pageLock } from '../pageLock';

import { Button } from '../button';
import { Shade } from '../shade';
import { StagedGroup } from '../stagedGroup';
import { openGroupBookmarks, openGroupEditModal, openGroupRemoveModal } from '../groupArea';

import { node } from '../../utility/node';
import { clearChildNode } from '../../utility/clearChildNode';
import { isValidString } from '../../utility/isValidString';
import { trimString } from '../../utility/trimString';

import './index.css';

const library = {};

library.current = null;

library.hiddenGroups = () => {

  const hiddenGroups = [];

  bookmark.all.forEach((group, index) => {

    if (group.hidden === true) {
      hiddenGroups.push({
        group: group,
        index: index
      });
    }

  });

  return hiddenGroups;

};

library.open = () => {

  if (library.current) {
    library.current.refresh();
    return;
  }

  library.current = new Library();

  library.current.open();

};

library.close = ({
  immediate = false
} = {}) => {

  if (library.current) {
    library.current.close({ immediate: immediate });
  }

};

library.toggle = () => {

  if (library.current) {
    library.close();
  } else {
    library.open();
  }

};

library.refresh = () => {

  if (library.current) {
    library.current.refresh();
  }

};

const Library = function() {

  this.element = {
    library: node('aside|class:library'),
    header: node('div|class:library-header'),
    heading: node('div|class:library-heading'),
    title: node('h1|class:library-title'),
    description: node('p|class:library-description small muted'),
    close: node('div|class:library-close'),
    content: node('div|class:library-content')
  };

  this.shade = new Shade();

  this.closeButton = new Button({
    text: message.get('libraryClose'),
    srOnly: true,
    iconName: 'cross',
    style: ['line'],
    title: message.get('libraryClose'),
    classList: ['library-close-button'],
    func: () => {
      this.close();
    }
  });

  this.remove = () => {

    const body = document.querySelector('body');

    if (body.contains(this.element.library)) {
      body.removeChild(this.element.library);
    }

    if (body.contains(this.shade.shade())) {
      body.removeChild(this.shade.shade());
    }

    if (library.current === this) {
      library.current = null;
    }

  };

  this.closeByShade = () => {
    this.close();
  };

  this.handleEscape = (event) => {

    if (event.key === 'Escape') {
      this.close();
    }

  };

  this.closeTimeout = null;

  this.close = ({
    immediate = false
  } = {}) => {

    clearTimeout(this.closeTimeout);

    window.removeEventListener('keydown', this.handleEscape);
    this.shade.shade().removeEventListener('click', this.closeByShade);

    pageLock.set('library', false);

    if (immediate) {
      this.remove();
      return;
    }

    this.element.library.classList.remove('is-open');
    this.shade.close();

    this.closeTimeout = setTimeout(() => {
      this.remove();
    }, 250);

  };

  this.bookmarkLink = (bookmarkItem) => {

    const link = node('a|class:library-bookmark-link,tabindex:1');
    const bookmarkName = bookmarkItem.display && bookmarkItem.display.name && isValidString(bookmarkItem.display.name.text) ? trimString(bookmarkItem.display.name.text) : false;
    const bookmarkUrl = isValidString(bookmarkItem.url) ? trimString(bookmarkItem.url) : false;

    if (bookmarkUrl) {
      link.setAttribute('href', bookmarkUrl);
      link.setAttribute('title', bookmarkUrl);
    } else {
      link.setAttribute('href', '#');
    }

    if (state.get.current().bookmark.newTab) {
      link.setAttribute('target', '_blank');
      link.setAttribute('rel', 'noopener noreferrer');
    }

    link.textContent = bookmarkName || bookmarkUrl || message.get('libraryBookmarkUntitled');

    return link;

  };

  this.groupSection = ({
    group = {},
    index = 0
  } = {}) => {

    const groupData = new StagedGroup();
    const section = node('section|class:library-group');
    const header = node('div|class:library-group-header');
    const meta = node('div|class:library-group-meta');
    const titleRow = node('div|class:library-group-title-row');
    const title = node('h2|class:library-group-title');
    const count = node('span|class:library-group-count');
    const toolbar = node('div|class:library-group-toolbar');
    const bookmarks = node('div|class:library-bookmark-list');
    const bookmarkCount = Array.isArray(group.items) ? group.items.length : 0;

    groupData.group = JSON.parse(JSON.stringify(group));
    groupData.position.origin = index;
    groupData.position.destination = index;
    groupData.type.existing = true;

    title.textContent = group.name && isValidString(group.name.text) ? trimString(group.name.text) : message.get('libraryGroupUnnamed');
    count.textContent = bookmarkCount;

    titleRow.appendChild(title);
    titleRow.appendChild(count);
    meta.appendChild(titleRow);

    if (bookmarkCount > 0) {
      toolbar.appendChild(new Button({
        text: message.get('libraryGroupOpenAll'),
        srOnly: true,
        iconName: 'openAll',
        style: ['line'],
        title: message.get('libraryGroupOpenAll'),
        classList: ['library-group-button', 'library-group-button-primary'],
        func: () => {
          openGroupBookmarks({
            groupData: groupData,
            alwaysNewTab: true
          });
        }
      }).button);
    }

    toolbar.appendChild(new Button({
      text: message.get('libraryGroupEdit'),
      srOnly: true,
      iconName: 'edit',
      style: ['line'],
      title: message.get('libraryGroupEdit'),
      classList: ['library-group-button'],
      func: () => {
        openGroupEditModal({
          groupData: groupData,
          beforeOpen: () => {
            this.close({ immediate: true });
          }
        });
      }
    }).button);

    toolbar.appendChild(new Button({
      text: message.get('libraryGroupRemove'),
      srOnly: true,
      iconName: 'cross',
      style: ['line'],
      title: message.get('libraryGroupRemove'),
      classList: ['library-group-button', 'library-group-button-danger'],
      func: () => {
        openGroupRemoveModal({
          groupData: groupData,
          beforeOpen: () => {
            this.close({ immediate: true });
          }
        });
      }
    }).button);

    header.appendChild(meta);
    header.appendChild(toolbar);

    if (Array.isArray(group.items) && group.items.length > 0) {

      group.items.forEach((bookmarkItem) => {
        bookmarks.appendChild(this.bookmarkLink(bookmarkItem));
      });

    } else {

      const empty = node('p|class:library-group-empty small muted');

      empty.textContent = message.get('libraryGroupEmpty');

      bookmarks.appendChild(empty);

    }

    section.appendChild(header);
    section.appendChild(bookmarks);

    return section;

  };

  this.renderGroups = () => {

    clearChildNode(this.element.content);

    const hiddenGroups = library.hiddenGroups();

    if (hiddenGroups.length === 0) {

      const empty = node('div|class:library-empty');
      const heading = node('p|class:library-empty-heading');
      const description = node('p|class:library-empty-description small muted');

      heading.textContent = message.get('libraryEmptyHeading');
      description.textContent = message.get('libraryEmptyDescription');

      empty.appendChild(heading);
      empty.appendChild(description);

      this.element.content.appendChild(empty);

      return;

    }

    hiddenGroups.forEach((item) => {
      this.element.content.appendChild(this.groupSection(item));
    });

  };

  this.refresh = () => {
    this.renderGroups();
  };

  this.assemble = () => {

    this.element.title.textContent = message.get('libraryTitle');
    this.element.description.textContent = message.get('libraryDescription');

    this.element.heading.appendChild(this.element.title);
    this.element.heading.appendChild(this.element.description);
    this.element.close.appendChild(this.closeButton.button);

    this.element.header.appendChild(this.element.heading);
    this.element.header.appendChild(this.element.close);

    this.element.library.appendChild(this.element.header);
    this.element.library.appendChild(this.element.content);

    this.renderGroups();

  };

  this.open = () => {

    const body = document.querySelector('body');

    this.assemble();

    this.shade.open();
    this.shade.shade().addEventListener('click', this.closeByShade);

    body.appendChild(this.element.library);

    window.requestAnimationFrame(() => {
      this.element.library.classList.add('is-open');
    });

    pageLock.set('library', true);

    window.addEventListener('keydown', this.handleEscape);

    this.closeButton.button.focus();

  };

};

export { library };
