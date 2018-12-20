<style scoped>
@import "styles/common.css";
.layout {
  border: 1px solid #d7dde4;
  background: #f5f7f9;
  position: relative;
  border-radius: 4px;
  overflow: hidden;
  /* min-height: 100vh; */
}
.layout-logo {
  width: 100px;
  height: 30px;
  background: #5b6270;
  border-radius: 3px;
  float: left;
  position: relative;
  top: 15px;
  left: 20px;
}
.layout-nav {
  width: 420px;
  margin: 0 auto;
  margin-right: 20px;
}
</style>
<template>
  <!-- <div>
        <router-view></router-view>
  </div>-->
  <div class="layout">
    <Layout style="min-height: 100vh">
      <Header>
        <Menu mode="horizontal" theme="dark" active-name="1">
          <div class="layout-logo"></div>
          <div class="layout-nav">
            <MenuItem name="1">
              <Icon type="ios-navigate"></Icon>Item 1
            </MenuItem>
            <MenuItem name="2">
              <Icon type="ios-keypad"></Icon>Item 2
            </MenuItem>
            <MenuItem name="3">
              <Icon type="ios-analytics"></Icon>Item 3
            </MenuItem>
            <MenuItem name="4">
              <Icon type="ios-paper"></Icon>Item 4
            </MenuItem>
          </div>
        </Menu>
      </Header>
      <Layout style="height: 100%">
        <Sider hide-trigger :style="{background: '#fff'}">
          <Menu theme="light" width="auto" active-name="1-1" :open-names="[1]" @on-select="selectMenu">
            <Submenu v-for="(subMenu, subIndex) in router" :key="subIndex" :name="subIndex + 1">
              <template slot="title">
                <Icon type="ios-navigate"></Icon>
                {{subMenu.label}}
              </template>
              <MenuItem
                v-for="(menuItem, itemIndex) in subMenu.children"
                :key="itemIndex"
                :name="(subIndex + 1) + '-' + (itemIndex + 1)"
              >{{menuItem.label}}</MenuItem>
            </Submenu>
          </Menu>
        </Sider>
        <Layout :style="{padding: '0 24px 24px'}">
          <Breadcrumb :style="{margin: '24px 0'}">
            <BreadcrumbItem>Home</BreadcrumbItem>
            <BreadcrumbItem>Components</BreadcrumbItem>
            <BreadcrumbItem>Layout</BreadcrumbItem>
          </Breadcrumb>
          <Content :style="{padding: '24px', minHeight: '280px', background: '#fff'}"><router-view></router-view></Content>
        </Layout>
      </Layout>
    </Layout>
  </div>
</template>
<script>
export default {
  data() {
    return {
      router: [
        {
          label: "图",
          path: "/graph",
          children: [
            {
              label: "dijkstra",
              path: "/dijkstra"
            },
            {
              label: "testgraph",
              path: "/test"
            }
          ]
        },
        {
          label: "图",
          path: "/graph",
          children: [
            {
              label: "dijkstra",
              path: "/dijkstra"
            },
            {
              label: "testgraph",
              path: "/test"
            }
          ]
        }
      ]
    };
  },
  mounted() {},
  beforeDestroy() {},
  methods: {
    selectMenu(name) {
      console.log("​selectMenu -> name", name);
      const index = name.split('-');
      const routerItem = this.router[+index[0] - 1];
      const parentUri = routerItem.path;
      const childrenUri = routerItem.children[+index[1] - 1].path;
      const uri = parentUri + childrenUri;
			console.log("​selectMenu -> uri", uri)
      this.$router.push(uri);
    }
  }
};
</script>
