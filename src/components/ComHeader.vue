<template>
    <header>
        <div class="header">
            <a href="/" class="logo">Khanh Store</a>
            <div class="header-left">
                <router-link to="/" exact-active-class="active">Trang chủ</router-link>
                <router-link to="/about" exact-active-class="active">Giới thiệu</router-link>
                <router-link to="/contact" exact-active-class="active">Liên hệ</router-link>
            </div>
            <div class="header-right">
                <div v-if="user == null">
                    <router-link to="/login" class="button">Đăng nhập</router-link>
                </div>
                <div v-else class="user-info">
                    <p class="user-button" @click="toggleMenu">Xin chào, {{ user.firstName }}</p>
                    <div v-show="showMenu" class="dropdown-menu">
                        <router-link to="/profile" @click="handleProfile">Hồ sơ</router-link>
                        <router-link to="/logout" @click="handleLogout">Đăng xuất</router-link>
                    </div>
                    <router-link to="/cart" class="cart-link" exact-active-class="active">🛒 Giỏ hàng</router-link>
                </div>
            </div>
        </div>
    </header>
    <router-view/>
</template>

<script>
import db from '../api/db';

export default {
    data() {
        return {
            user: null,
            showMenu: false,
        }
    }, 
    async mounted() {
        this.user = JSON.parse(localStorage.getItem("user"));
        if (this.user != null) {
            const user = await db.getUser(this.user.password, this.user.password);

            if (user == null) {
                this.user = null;
            } else {
                this.user = user;
                return;
            }
        }
    },
    methods: {
        toggleMenu() {
            this.showMenu = !this.showMenu;
        },
        handleProfile(event) {
            event.preventDefault(); // Prevents immediate navigation
            this.toggleMenu();
            this.$router.push('/profile');
        },
        handleLogout(event) {
            event.preventDefault(); // Prevents immediate navigation
            this.toggleMenu();
            this.$router.push('/logout');
        }
    }
}
</script>

<style scoped>
.header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 20px;
    background-color: #333;
    color: white;
}

.logo {
    font-size: 24px;
    font-weight: bold;
    color: white;
    text-decoration: none;
}

.header-left {
    display: flex;
    gap: 15px;
}

.header-left a,
.header-right .cart-link {
    color: white;
    text-decoration: none;
    font-size: 16px;
    padding: 8px;
}

.header-left a:hover,
.header-right .cart-link:hover {
    background-color: #555;
    border-radius: 5px;
}

.header-right .user-info {
    display: flex;
    align-items: center;
    gap: 10px;
    position: relative; /* Ensures dropdown positions relative to .user-info */
}

.user-button {
    background-color: #4CAF50;
    color: white;
    padding: 8px 16px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;
    display: inline-block;
}

.user-button:hover {
    background-color: #45a049;
}

.dropdown-menu {
    position: absolute;
    top: 110%; /* Space slightly below the button */
    left: 0;
    background-color: white;
    color: #333;
    border: 1px solid #ddd;
    border-radius: 5px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    padding: 10px 0;
    min-width: 150px;
    z-index: 1;
}

.dropdown-menu a {
    color: #333;
    text-decoration: none;
    padding: 10px 20px;
    display: block;
    transition: background-color 0.3s;
}

.dropdown-menu a:hover {
    background-color: #f0f0f0;
}

.active {
    font-weight: bold;
    color: #4CAF50;
    border-bottom: 2px solid #4CAF50;
}

.button {
    background-color: #4CAF50;
    color: white;
    padding: 10px 20px;
    text-decoration: none;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;
}

.button:hover {
    background-color: #45a049;
}

@media (max-width: 600px) {
    .header {
        flex-direction: column;
    }
    .header-left, .header-right {
        justify-content: center;
        width: 100%;
    }
}
</style>
