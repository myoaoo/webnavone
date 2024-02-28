	const initialPath = window.location.href;
    function returnToInitialPath() {
        window.location.href = initialPath;
    }

	function generateCategoryHTML(category, items) {
		const categoryId = category.replace(/\s+/g, '-').toLowerCase();
		const categoryHTML = `<div class="category-container" id="${categoryId}">
		  <h3>${category}</h3>
		  <div class="grid-container">
			${items.map(item => `<a href="${item.url}" target="_blank"><div class="grid-item">
			  <div class="image-container">
				<img src="https://api.iowen.cn/favicon/${item.url.replace(/^https?:\/\//, '')}.png">
			  </div>
			  <div class="padding" title="${item.title}">
				<strong>${item.name}</strong>
				<p class="description"  >${item.title}</p>
			  </div>
			</div>`).join('')}
		  </div>
		</div>`;
		document.getElementById('app').innerHTML += categoryHTML;
	}

function showNavbarLinksInSidebar() {
    const sidebarLinksContainer = document.getElementById('sidebar-links');
    sidebarLinksContainer.innerHTML = '';

    // Add the first div displaying 'abc'
    sidebarLinksContainer.innerHTML += `<div class="sidebar-div">abc</div>`;

    // Add the second div wrapping the dynamic links
    const dynamicLinksDiv = document.createElement('div');
    for (const category in categories) {
        const categoryId = category.replace(/\s+/g, '-').toLowerCase();
        dynamicLinksDiv.innerHTML += `<a href="#${categoryId}">${category}</a>`;
    }
    sidebarLinksContainer.appendChild(dynamicLinksDiv);
}


	function toggleSidebar() {
		const sidebar = document.getElementById('sidebar');
		const sidebarWidth = sidebar.style.width;

		if (sidebarWidth === '300px') {
			sidebar.style.width = '0';
		} else {
			sidebar.style.width = '300px';
			showNavbarLinksInSidebar(); // 打开侧边栏时更新链接
		}
	}

	function showNavbarLinks() {
		const navbarLinksContainer = document.getElementById('navbar-links');
		// 为导航栏生成动态链接
		for (const category in categories) {
			const categoryId = category.replace(/\s+/g, '-').toLowerCase();
			navbarLinksContainer.innerHTML += `<a href="javascript:void(0);" onclick="showCategory('${category}')">${category}</a>`;
		}
	}

	function showCategory(category) {
		const appContainer = document.getElementById('app');
		appContainer.innerHTML = '';
		// 显示所选分类
		generateCategoryHTML(category, categories[category]);
	}

	function renderCategories(filter) {
		const appContainer = document.getElementById('app');
		appContainer.innerHTML = '';
		for (const category in categories) {
			const filteredItems = categories[category].filter(item =>
				item.name.toLowerCase().includes(filter.toLowerCase()) ||
				item.title.toLowerCase().includes(filter.toLowerCase())
			);
			if (filteredItems.length > 0) {
				generateCategoryHTML(category, filteredItems);
			}
		}
	}
	
	function resetFilter() {
		const filterInput = document.getElementById('filterInput');
		filterInput.value = '';
		renderCategories('');
	}

	renderCategories('');
	
	const filterInput = document.getElementById('filterInput');
	filterInput.addEventListener('input', function () {
		renderCategories(this.value);
	});

	function showNavbarLinks() {
		const navbarLinksContainer = document.getElementById('navbar-links');

		// Clear existing links
		navbarLinksContainer.innerHTML = '';

		// Add dynamic links
		for (const category in categories) {
			const categoryId = category.replace(/\s+/g, '-').toLowerCase();
			navbarLinksContainer.innerHTML += `<a href="javascript:void(0);" onclick="showCategory('${category}')">${category}</a>`;
		}
	}

	showNavbarLinks(); // 初始时显示导航栏链接
		
	function toggleSidebar() {
	  const sidebar = document.getElementById('sidebar');
	  const overlay = document.getElementById('overlay');
	  if (sidebar.classList.contains('overlay-open')) {
		  sidebar.classList.remove('overlay-open');
		  overlay.style.display = 'none';
	  } else {
		  sidebar.classList.add('overlay-open');
		  overlay.style.display = 'block';
		  showNavbarLinksInSidebar();
	  }
	}

	function closeSidebar() {
	  const sidebar = document.getElementById('sidebar');
	  const overlay = document.getElementById('overlay');
	  sidebar.classList.remove('overlay-open');
	  overlay.style.display = 'none';
	}