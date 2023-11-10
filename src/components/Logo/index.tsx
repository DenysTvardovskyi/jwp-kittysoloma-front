import React, { FC, useEffect, useState } from "react";

interface IProps {
    width: number;
    height: number;
}

export const Logo: FC<IProps> = ({ height = 42, width = 40 }: IProps): JSX.Element => {
    return (
        <svg className="logo__kitty" viewBox="0 0 38 40" fill="none" width={width} height={height}>
            <g clip-path="url(#clip0_262_1471)">
                <path
                    d="M25.6419 10.3647C27.1056 3.54234 33.5452 4.72046 33.5452 4.72046C34.8773 6.38814 34.7017 10.0784 32.451 14.7543C32.451 14.7543 24.1781 17.1875 25.6419 10.3647Z"
                    fill="white"></path>
                <g opacity="0.55">
                    <path opacity="0.55"
                          d="M32.4526 14.7538C32.4526 14.7538 30.7168 15.2642 28.9761 15.1619C29.8249 15.1138 30.6664 14.977 31.4867 14.7538C33.7371 10.0779 33.9128 6.38756 32.5807 4.71988C32.3824 4.68743 32.1824 4.66586 31.9818 4.65526C32.9053 4.60276 33.5468 4.71988 33.5468 4.71988C34.879 6.38756 34.7033 10.0779 32.4526 14.7538Z"
                          fill="white"></path>
                </g>
                <path d="M5.71191 31.7295C5.71191 41.0447 31.9005 41.0447 31.9005 31.7295H5.71191Z"
                      fill="white"></path>
                <g opacity="0.3">
                    <path opacity="0.3"
                          d="M31.782 32.7941H12.4662C12.4662 35.6271 14.889 37.5986 18.2611 38.7087C11.9013 38.583 5.71338 36.257 5.71338 31.728H31.9026C31.9032 32.0868 31.8627 32.4445 31.782 32.7941Z"
                          fill="black"></path>
                </g>
                <g opacity="0.55">
                    <path opacity="0.55"
                          d="M31.9004 31.7292C31.9004 36.5621 24.853 38.8882 18.0703 38.7057C24.3636 38.5387 30.4313 36.2136 30.4313 31.7292H31.9004Z"
                          fill="white"></path>
                </g>
                <path
                    d="M5.16601 14.7541C2.91556 10.0782 2.73989 6.38788 4.07178 4.7202C4.07178 4.7202 7.28685 3.54051 10.2409 9.91709L5.16601 14.7541Z"
                    fill="white"></path>
                <g opacity="0.3">
                    <path opacity="0.3"
                          d="M10.2362 9.91873L5.16176 14.7553C5.15322 14.7382 5.14469 14.7201 5.1375 14.703L8.66639 11.3392C6.68663 7.06665 4.59095 6.18693 3.42236 6.07116C3.56389 5.53404 3.78179 5.08083 4.06753 4.7214C4.06708 4.72095 7.2826 3.54149 10.2362 9.91873Z"
                          fill="black"></path>
                </g>
                <path
                    d="M36.2128 25.3075C36.1239 25.7229 35.9876 26.1269 35.8066 26.5114C33.4811 31.4609 29.6929 33.9551 24.7897 35.176C20.8634 36.1521 16.7574 36.1521 12.8311 35.176C7.9277 33.9551 4.13965 31.4609 1.81424 26.5114C1.23286 25.277 1.12245 23.8732 1.50374 22.5633C2.39301 19.5086 3.61188 16.9168 5.16732 14.7565V14.7552C6.40687 13.0323 7.8612 11.5858 9.53258 10.3978H9.53505H9.53617C9.85836 10.1675 10.1879 9.94769 10.5248 9.73855C8.60578 6.63267 6.60728 4.02001 4.07202 4.7208C5.57039 2.84551 8.9765 3.52409 13.4894 8.22993C13.5224 8.21534 13.5568 8.20076 13.5907 8.18729C16.9361 6.82745 20.6813 6.82745 24.0267 8.18729C24.0609 8.20076 24.0941 8.21534 24.1281 8.22993C28.6409 3.52409 32.0473 2.84439 33.5454 4.7208C31.0101 4.02001 29.0119 6.63267 27.0927 9.73855C29.1876 11.0374 30.9713 12.7006 32.451 14.7563V14.7577C34.0067 16.9179 35.2253 19.5097 36.1148 22.5644C36.3752 23.4564 36.4089 24.3992 36.2128 25.3075Z"
                    fill="white"></path>
                <path
                    d="M18.809 36.333C16.7587 36.3335 14.716 36.0839 12.7263 35.5898C7.22511 34.2199 3.63454 31.3936 1.42619 26.6923C0.801337 25.3639 0.682874 23.8535 1.09299 22.4442C1.98541 19.3783 3.23484 16.7144 4.80601 14.5268C4.81028 14.5198 4.815 14.5129 4.81994 14.5059C6.23091 12.5463 7.95149 10.8987 9.93898 9.60418C7.97688 6.48954 6.22844 4.56511 4.18725 5.13037C4.1003 5.15445 4.00795 5.15039 3.92345 5.11878C3.83895 5.08717 3.76666 5.02964 3.71694 4.95443C3.66723 4.87923 3.64265 4.79023 3.64674 4.7002C3.65082 4.61018 3.68336 4.52376 3.73969 4.45336C4.29442 3.75907 5.08124 3.36952 6.015 3.32734C8.07596 3.23354 10.6959 4.75338 13.597 7.72552C16.9628 6.40315 20.6518 6.40158 24.022 7.72552C26.923 4.75405 29.5436 3.23758 31.6039 3.32734C32.5377 3.36952 33.3245 3.75907 33.8792 4.45336C33.9356 4.52376 33.9681 4.61018 33.9722 4.7002C33.9763 4.79023 33.9517 4.87923 33.902 4.95443C33.8523 5.02964 33.78 5.08717 33.6955 5.11878C33.611 5.15039 33.5186 5.15445 33.4317 5.13037C31.3871 4.56556 29.6409 6.48954 27.68 9.60418C29.6672 10.8987 31.3871 12.5463 32.7988 14.5059C32.8037 14.5129 32.8084 14.5198 32.8129 14.527C34.3841 16.7147 35.6333 19.3783 36.5259 22.4442C36.9362 23.8538 36.8176 25.3644 36.1925 26.6929C33.9833 31.3936 30.3927 34.221 24.8913 35.5898C22.9017 36.0839 20.8592 36.3335 18.809 36.333ZM5.527 14.9857C5.52273 14.9924 5.51801 14.9994 5.51329 15.0059C3.99245 17.1183 2.78099 19.7012 1.91284 22.683C1.56075 23.8932 1.66243 25.19 2.19885 26.3308C4.28835 30.7806 7.7003 33.4599 12.9324 34.7627C16.7912 35.7193 20.8257 35.7193 24.6846 34.7627C29.9168 33.4599 33.3274 30.7806 35.4181 26.3305C35.9547 25.19 36.0566 23.8931 35.7045 22.683C34.8364 19.7012 33.6251 17.1179 32.1041 15.0059C32.0993 14.9991 32.0946 14.9922 32.0901 14.9852C30.6625 13.0076 28.9056 11.3641 26.8673 10.1003C26.7712 10.0408 26.7027 9.94562 26.6768 9.83569C26.6509 9.72576 26.6697 9.61005 26.7291 9.51397C28.196 7.13962 29.9025 4.68113 32.0443 4.24557C31.8869 4.20874 31.7264 4.18688 31.5648 4.18027C30.5064 4.13292 28.1679 4.63288 24.4361 8.52438C24.3753 8.5878 24.2964 8.63094 24.2101 8.64789C24.1238 8.66484 24.0344 8.65477 23.9541 8.61907C23.9269 8.60696 23.8986 8.59484 23.8703 8.58362C20.6046 7.25519 17.0125 7.25519 13.7515 8.58182C13.7185 8.59462 13.69 8.60696 13.6617 8.61907C13.5814 8.65472 13.492 8.66475 13.4058 8.64781C13.3196 8.63086 13.2407 8.58776 13.18 8.52438C9.44807 4.63288 7.11232 4.1336 6.05117 4.18027C5.88965 4.1869 5.72911 4.20876 5.57171 4.24557C7.71401 4.6809 9.41998 7.14029 10.8871 9.51397C10.9465 9.61005 10.9654 9.72576 10.9395 9.83569C10.9136 9.94562 10.845 10.0408 10.7489 10.1003C8.7118 11.3641 6.95459 13.0078 5.527 14.9857Z"
                    fill="black"></path>
                <path
                    d="M5.16736 15.1838C5.08682 15.1839 5.00789 15.1613 4.9397 15.1184C4.87151 15.0756 4.81684 15.0144 4.782 14.9419C2.59727 10.4029 2.19798 6.38445 3.73851 4.45491C3.80912 4.36647 3.91203 4.30966 4.02458 4.297C4.13713 4.28433 4.25011 4.31683 4.33867 4.38736C4.42723 4.45789 4.4841 4.56067 4.49679 4.67308C4.50947 4.7855 4.47692 4.89834 4.4063 4.98678C3.0916 6.63288 3.54145 10.3952 5.55226 14.5723C5.58363 14.6373 5.59797 14.7092 5.59394 14.7812C5.58991 14.8533 5.56765 14.9231 5.52924 14.9842C5.49083 15.0453 5.43752 15.0957 5.37431 15.1306C5.31109 15.1655 5.24004 15.1838 5.1678 15.1838H5.16736Z"
                    fill="black"></path>
                <path
                    d="M32.4505 15.1838C32.3782 15.1839 32.3071 15.1656 32.2439 15.1307C32.1806 15.0958 32.1273 15.0454 32.0889 14.9843C32.0504 14.9232 32.0281 14.8533 32.0241 14.7813C32.0201 14.7092 32.0344 14.6373 32.0658 14.5723C34.0764 10.3955 34.526 6.63288 33.2117 4.98678C33.1768 4.94299 33.1508 4.89274 33.1353 4.83892C33.1197 4.78509 33.115 4.72874 33.1213 4.67308C33.1275 4.61742 33.1447 4.56354 33.1719 4.51452C33.199 4.46549 33.2355 4.42228 33.2794 4.38736C33.3232 4.35244 33.3735 4.32648 33.4274 4.31098C33.4813 4.29547 33.5377 4.29072 33.5935 4.29699C33.6492 4.30327 33.7031 4.32044 33.7522 4.34753C33.8013 4.37463 33.8446 4.41112 33.8795 4.45491C35.4207 6.3849 35.0208 10.402 32.836 14.9419C32.8012 15.0145 32.7465 15.0757 32.6782 15.1185C32.61 15.1613 32.531 15.184 32.4505 15.1838Z"
                    fill="black"></path>
                <path
                    d="M20.5119 24.9946C20.5119 25.3015 19.8604 26.0987 19.0557 26.0987C18.2511 26.0987 17.5996 25.3015 17.5996 24.9946C17.5996 24.6877 18.2511 24.5149 19.0557 24.5149C19.8604 24.5149 20.5119 24.6874 20.5119 24.9946Z"
                    fill="black"></path>
                <path
                    d="M19.3318 26.5443C19.2488 26.7687 19.3228 27.0172 19.2286 27.236L19.0832 27.5626L19.0086 27.7249C18.9828 27.7807 18.9637 27.8272 18.9248 27.8993C18.6551 28.4319 18.1077 28.8083 17.5207 28.8585C16.9661 28.898 16.4528 28.7647 15.9915 28.5367C15.5344 28.3115 15.1424 27.9737 14.8523 27.5552C14.8351 27.5299 14.828 27.4992 14.8323 27.4689C14.8366 27.4387 14.8522 27.4111 14.8758 27.3918C14.8994 27.3724 14.9295 27.3625 14.96 27.3641C14.9906 27.3658 15.0194 27.3787 15.0409 27.4005C15.3579 27.7217 15.7445 27.9661 16.1708 28.1149C16.3775 28.1875 16.5921 28.235 16.8101 28.2563C17.0189 28.2783 17.2297 28.2716 17.4367 28.2364C17.6167 28.1994 17.7848 28.1185 17.9259 28.0009C18.5598 27.4715 18.716 26.4913 18.8248 26.2788C18.8689 26.1922 18.9456 26.1267 19.0381 26.0967C19.1305 26.0666 19.2311 26.0743 19.3178 26.1183C19.4859 26.2045 19.3956 26.3724 19.3318 26.5443Z"
                    fill="black"></path>
                <path
                    d="M19.4207 25.6721C19.4347 25.9102 19.4405 26.1484 19.4432 26.3865L19.4412 26.7437L19.4349 27.0863C19.434 27.2672 19.4747 27.446 19.5537 27.6088C19.6358 27.7731 19.7573 27.9145 19.9073 28.0205C20.0827 28.1356 20.273 28.2262 20.473 28.2897C20.6812 28.3575 20.8968 28.4 21.1152 28.4163C21.5654 28.4506 22.0175 28.3815 22.4368 28.2144H22.4379C22.4662 28.2032 22.4977 28.203 22.5261 28.2138C22.5546 28.2246 22.578 28.2456 22.5918 28.2727C22.6056 28.2998 22.6088 28.331 22.6008 28.3604C22.5928 28.3897 22.5741 28.415 22.5484 28.4313C22.1147 28.6988 21.6199 28.8513 21.1107 28.8744C20.5967 28.8987 20.0731 28.8152 19.5811 28.5569C19.0645 28.2763 18.7136 27.7125 18.6801 27.1165C18.6745 27.0356 18.6747 26.9849 18.6734 26.9234L18.6702 26.7439L18.668 26.3867C18.6698 26.1487 18.6754 25.9104 18.6893 25.6723C18.695 25.5792 18.736 25.4918 18.804 25.4279C18.872 25.364 18.9619 25.3284 19.0553 25.3284C19.1486 25.3284 19.2385 25.364 19.3065 25.4279C19.3745 25.4918 19.4155 25.5792 19.4212 25.6723L19.4207 25.6721Z"
                    fill="black"></path>
                <path
                    d="M17.8275 30.076C18.0582 30.1056 18.2653 30.1453 18.468 30.17C18.8598 30.2241 19.2573 30.2241 19.6491 30.17C19.8513 30.1451 20.0589 30.1056 20.2898 30.076H20.2923C20.3142 30.073 20.3366 30.0769 20.3563 30.087C20.376 30.0971 20.3922 30.113 20.4025 30.1326C20.4129 30.1522 20.417 30.1745 20.4143 30.1964C20.4115 30.2184 20.4021 30.239 20.3873 30.2555C20.2222 30.4373 20.0183 30.5797 19.7907 30.6721C19.5586 30.7695 19.3094 30.8197 19.0576 30.8197C18.8059 30.8197 18.5567 30.7695 18.3246 30.6721C18.0972 30.5792 17.8936 30.4363 17.7289 30.2541C17.7141 30.2377 17.7047 30.2171 17.702 30.1952C17.6993 30.1733 17.7033 30.1511 17.7136 30.1315C17.7239 30.112 17.74 30.096 17.7596 30.0859C17.7792 30.0757 17.8015 30.0718 17.8235 30.0746L17.8275 30.076Z"
                    fill="black"></path>
                <path
                    d="M11.4444 25.935C10.5007 25.8964 9.56348 25.8762 8.63054 25.9125C7.69759 25.9489 6.77094 26.0375 5.86115 26.2083L5.52028 26.2725L5.18324 26.3497C5.07089 26.3764 4.95719 26.3981 4.84619 26.4291L4.51364 26.5243C4.40354 26.5584 4.28894 26.5813 4.18109 26.6201L3.85348 26.7301C3.63238 26.7974 3.42229 26.8912 3.2068 26.9731C2.34794 27.3232 1.53578 27.7781 0.788837 28.3275C0.764115 28.3455 0.733542 28.3536 0.703136 28.3502C0.67273 28.3468 0.644692 28.3322 0.624544 28.3092C0.604395 28.2862 0.593595 28.2565 0.594268 28.2259C0.59494 28.1954 0.607037 28.1662 0.628178 28.1441C1.29778 27.452 2.11365 26.8975 2.98929 26.4823C3.20882 26.3795 3.4288 26.2749 3.65754 26.1948L3.99773 26.066C4.11008 26.0211 4.22782 25.9902 4.34332 25.9538L4.6916 25.8494C4.80799 25.8156 4.9264 25.7911 5.0437 25.7615L5.39647 25.6766C5.51444 25.6499 5.63398 25.6331 5.75284 25.6109C6.7013 25.4427 7.66412 25.3689 8.62717 25.3905C9.5831 25.4079 10.5357 25.5091 11.4739 25.693C11.5043 25.6987 11.5315 25.7158 11.5499 25.7407C11.5682 25.7657 11.5764 25.7967 11.5727 25.8274C11.5691 25.8582 11.5539 25.8864 11.5302 25.9064C11.5065 25.9263 11.4761 25.9365 11.4451 25.935H11.4444Z"
                    fill="black"></path>
                <path
                    d="M11.6036 27.2812C10.7628 27.3557 9.93028 27.4459 9.10675 27.5817C8.28321 27.7174 7.46956 27.8933 6.67343 28.126C5.87803 28.3554 5.10141 28.6455 4.35042 28.9936C3.59797 29.3436 2.88162 29.7662 2.21161 30.2556H2.21003C2.1855 30.2736 2.15513 30.2818 2.12486 30.2787C2.09458 30.2755 2.06657 30.2612 2.04628 30.2385C2.026 30.2159 2.01489 30.1865 2.01514 30.156C2.01539 30.1256 2.02697 30.0964 2.04762 30.0741C2.63416 29.4405 3.34717 28.9258 4.10556 28.511C4.86699 28.1002 5.67201 27.7757 6.50563 27.5435C8.16244 27.0793 9.8877 26.9077 11.6036 27.0365C11.6342 27.0391 11.6626 27.0531 11.6834 27.0756C11.7041 27.0982 11.7156 27.1277 11.7156 27.1583C11.7156 27.1889 11.7041 27.2184 11.6834 27.241C11.6626 27.2635 11.6342 27.2775 11.6036 27.2801V27.2812Z"
                    fill="black"></path>
                <path
                    d="M11.6272 28.4923C10.9294 28.6965 10.2398 28.9056 9.56226 29.145C8.88475 29.3844 8.21891 29.648 7.57014 29.9473C6.92199 30.245 6.29103 30.5787 5.68024 30.9468C5.06802 31.3169 4.48191 31.7283 3.92602 32.1784H3.92467C3.90123 32.1972 3.87168 32.2068 3.84164 32.2053C3.81159 32.2038 3.78314 32.1913 3.7617 32.1702C3.74027 32.1492 3.72733 32.121 3.72536 32.091C3.72339 32.061 3.73252 32.0313 3.75102 32.0076C4.21064 31.4227 4.77606 30.924 5.38169 30.4932C5.99032 30.0658 6.63915 29.6985 7.319 29.3965C7.99432 29.0926 8.69294 28.8433 9.40816 28.651C10.1197 28.4557 10.8468 28.3222 11.5813 28.2518C11.6115 28.2495 11.6414 28.2584 11.6654 28.2768C11.6894 28.2951 11.7057 28.3217 11.7113 28.3514C11.7169 28.3811 11.7113 28.4118 11.6956 28.4376C11.6799 28.4634 11.6552 28.4825 11.6263 28.4912L11.6272 28.4923Z"
                    fill="black"></path>
                <path
                    d="M26.6418 25.6935C27.5805 25.5099 28.5335 25.409 29.4898 25.3921C30.4529 25.3705 31.4157 25.4443 32.3642 25.6125C32.483 25.6349 32.6028 25.6515 32.7205 25.6782L33.0735 25.7631C33.1908 25.7927 33.3092 25.8171 33.4254 25.851L33.7737 25.9554C33.8894 25.9913 34.006 26.0227 34.1193 26.0676L34.4597 26.1964C34.6884 26.2765 34.9091 26.3811 35.1277 26.4839C36.004 26.8991 36.8192 27.4536 37.4888 28.1457C37.51 28.1678 37.5221 28.197 37.5227 28.2275C37.5234 28.2581 37.5126 28.2878 37.4925 28.3108C37.4723 28.3338 37.4443 28.3484 37.4139 28.3518C37.3835 28.3551 37.3529 28.347 37.3282 28.329C36.5813 27.7797 35.7692 27.3248 34.9104 26.9747C34.6947 26.8928 34.4846 26.799 34.2635 26.7316L33.9359 26.6217C33.8274 26.5829 33.7137 26.56 33.6036 26.5259L33.271 26.4307C33.1598 26.3997 33.0463 26.378 32.934 26.3513L32.597 26.2741L32.2547 26.2097C31.3449 26.0389 30.4176 25.9522 29.4854 25.9139C28.5531 25.8755 27.6148 25.8975 26.6715 25.9363C26.6392 25.9402 26.6068 25.9312 26.5812 25.9112C26.5556 25.8912 26.539 25.8619 26.5351 25.8297C26.5311 25.7975 26.5402 25.7651 26.5602 25.7395C26.5802 25.714 26.6096 25.6974 26.6418 25.6935Z"
                    fill="black"></path>
                <path
                    d="M26.5099 27.0369C28.2258 26.9082 29.9511 27.0798 31.6079 27.544C32.4415 27.7762 33.2465 28.1007 34.008 28.5115C34.7664 28.9263 35.4794 29.441 36.0659 30.0746C36.0866 30.0969 36.0981 30.1261 36.0984 30.1565C36.0986 30.1869 36.0875 30.2163 36.0673 30.239C36.047 30.2617 36.019 30.276 35.9887 30.2792C35.9584 30.2823 35.928 30.2741 35.9035 30.2561H35.9019C35.2319 29.7667 34.5156 29.344 33.7631 28.9941C33.0121 28.646 32.2355 28.3559 31.4401 28.1264C30.644 27.8938 29.8299 27.7195 29.007 27.5821C28.1842 27.4448 27.3507 27.3562 26.5099 27.2817C26.4794 27.2791 26.4509 27.2651 26.4302 27.2426C26.4095 27.22 26.3979 27.1905 26.3979 27.1599C26.3979 27.1293 26.4095 27.0998 26.4302 27.0772C26.4509 27.0547 26.4794 27.0407 26.5099 27.0381V27.0369Z"
                    fill="black"></path>
                <path
                    d="M26.5329 28.2534C27.2676 28.3238 27.9947 28.4573 28.7064 28.6526C29.4216 28.8449 30.1202 29.0942 30.7955 29.3981C31.4756 29.7001 32.1247 30.0675 32.7335 30.495C33.34 30.9258 33.9045 31.4245 34.3644 32.0094C34.3827 32.0332 34.3918 32.0628 34.3897 32.0928C34.3877 32.1227 34.3748 32.1509 34.3533 32.1719C34.3319 32.193 34.3035 32.2055 34.2735 32.207C34.2435 32.2086 34.214 32.1991 34.1905 32.1804L34.1892 32.1793C33.6333 31.7293 33.0472 31.3178 32.4349 30.9478C31.8242 30.5796 31.1932 30.2459 30.545 29.9482C29.8963 29.6489 29.2298 29.3873 28.5529 29.1459C27.8761 28.9045 27.186 28.6972 26.488 28.4933C26.4591 28.4845 26.4344 28.4654 26.4187 28.4396C26.403 28.4138 26.3974 28.3831 26.403 28.3534C26.4085 28.3238 26.4249 28.2972 26.4489 28.2788C26.4729 28.2604 26.5028 28.2515 26.5329 28.2539V28.2534Z"
                    fill="black"></path>
                <path
                    d="M18.8064 39.1415C15.3139 39.1415 12.0518 38.5065 9.62086 37.3536C6.78436 36.0083 5.28467 34.0631 5.28467 31.7285C5.28467 31.6154 5.32964 31.507 5.4097 31.427C5.48975 31.347 5.59833 31.3021 5.71155 31.3021C5.82476 31.3021 5.93334 31.347 6.0134 31.427C6.09345 31.507 6.13843 31.6154 6.13843 31.7285C6.13843 34.2325 8.23103 35.7505 9.9864 36.583C12.3053 37.6825 15.4374 38.2884 18.8057 38.2884C22.174 38.2884 25.306 37.6825 27.6248 36.583C29.3804 35.7505 31.4728 34.2325 31.4728 31.7285C31.4728 31.6154 31.5178 31.507 31.5978 31.427C31.6779 31.347 31.7865 31.3021 31.8997 31.3021C32.0129 31.3021 32.1215 31.347 32.2015 31.427C32.2816 31.507 32.3265 31.6154 32.3265 31.7285C32.3274 36.8217 25.3185 39.1415 18.8064 39.1415Z"
                    fill="black"></path>
                <g opacity="0.3">
                    <path opacity="0.3"
                          d="M36.2118 25.3076C36.1229 25.7231 35.9866 26.127 35.8056 26.5115C33.4802 31.461 29.6919 33.9552 24.7888 35.1761C20.8624 36.1523 16.7564 36.1523 12.8301 35.1761C7.92673 33.9552 4.13867 31.461 1.81326 26.5115C1.23188 25.2771 1.12148 23.8733 1.50276 22.5634C2.39203 19.5087 3.61091 16.9169 5.16635 14.7566V14.7553C6.40589 13.0324 7.86023 11.5859 9.5316 10.3979H9.53407C-2.87036 26.0975 19.5205 38.1092 36.2118 25.3076Z"
                          fill="black"></path>
                </g>
                <path
                    d="M26.6877 20.9433C26.6877 22.6307 25.6787 23.9989 24.4342 23.9989C23.1897 23.9989 22.1807 22.6298 22.1807 20.9433C22.1807 19.2569 23.2296 21.4602 24.4342 17.8877C25.4318 17.1444 26.6877 19.2557 26.6877 20.9433Z"
                    fill="black"></path>
                <path
                    d="M11.4272 20.9441C11.4272 22.6315 12.4363 23.9997 13.6808 23.9997C14.9253 23.9997 15.9343 22.6306 15.9343 20.9441C15.9343 19.2577 14.43 21.2839 13.6808 17.8885C12.6951 17.1295 11.4272 19.2565 11.4272 20.9441Z"
                    fill="black"></path>
            </g>
            <path
                d="M34.3726 15.1496C33.5295 7.43285 26.8495 1.42664 18.7352 1.42664C10.5992 1.42664 3.91226 7.45819 3.09082 15.2003C12.4373 12.9294 22.9285 12.9105 34.3726 15.1497V15.1496Z"
                fill="white"></path>
            <path fill-rule="evenodd" clip-rule="evenodd"
                  d="M35.4835 15.0881V16.5117L34.1586 16.2525C22.8386 14.0374 12.5117 14.0661 3.34932 16.2924L1.81396 16.6654L1.98208 15.0809C2.8664 6.74613 10.0505 0.303711 18.7331 0.303711C27.3928 0.303711 34.5692 6.71881 35.4768 15.0268L35.4835 15.0881ZM3.26439 14.0044C3.19033 14.3981 3.13158 14.797 3.08876 15.2005C3.47126 15.1076 3.85567 15.0184 4.24199 14.933C12.979 13.0017 22.69 12.9999 33.2227 14.9323C33.6041 15.0023 33.9866 15.0748 34.3701 15.1498C34.3701 15.1498 34.3702 15.1498 34.3702 15.1498C34.3703 15.1499 34.3704 15.1499 34.3705 15.1499V15.1498C34.3271 14.7526 34.2682 14.3598 34.1945 13.9722C32.8359 6.83054 26.4297 1.4268 18.7331 1.4268C11.0212 1.4268 4.61123 6.84598 3.26439 14.0044Z"
                  fill="black"></path>
            <path
                d="M34.645 16.5113C22.9063 14.1382 12.2128 14.1697 2.76499 16.6065C2.37211 17.2593 1.86064 19.0308 1.60279 19.9805C1.52556 20.2636 1.82002 20.5108 2.13916 20.4371C3.2057 20.1919 4.2677 19.9724 5.32996 19.7788C4.98218 22.9155 6.45001 25.3422 6.15434 27.9585L5.21785 27.464C4.87854 27.285 4.43435 27.382 4.23007 27.6842C4.02579 27.9857 4.13715 28.3766 4.47945 28.5563L8.11248 30.4733C8.45404 30.6537 8.89598 30.5547 9.10026 30.2532C9.30453 29.9516 9.19318 29.5608 8.85088 29.3811L7.49588 28.6661C8.15233 25.4051 6.25721 22.7364 6.80952 19.5118C14.941 18.1521 22.9144 18.1395 30.7289 19.4746C31.0124 22.4734 29.3539 25.0274 29.9738 28.1092L28.6188 28.8242C28.2767 29.0046 28.1659 29.395 28.3694 29.6963C28.5737 29.9978 29.0159 30.0962 29.3572 29.9165L32.9902 27.9994C33.3323 27.819 33.4431 27.4286 33.2396 27.1273C33.0346 26.8253 32.5911 26.7288 32.2518 26.9071L31.3153 27.4016C31.0361 24.9377 32.3245 22.6479 32.1845 19.7467C33.2346 19.9497 34.279 20.178 35.3231 20.4283C35.6432 20.5053 35.9409 20.2594 35.8637 19.9743C35.5951 18.974 35.0473 17.0695 34.6444 16.5106L34.645 16.5113Z"
                fill="white"></path>
            <path fill-rule="evenodd" clip-rule="evenodd"
                  d="M34.6166 16.5057C34.6259 16.5076 34.6352 16.5094 34.6445 16.5113C34.6449 16.5114 34.6452 16.5115 34.6456 16.5115L34.6456 16.5116C34.8156 16.7478 35.0113 17.2233 35.201 17.7692C35.4608 18.5169 35.7092 19.3967 35.8643 19.9746C35.9416 20.2597 35.6438 20.5056 35.3237 20.4286C34.6519 20.2676 33.98 20.1156 33.3066 19.9737C32.9333 19.895 32.5596 19.8194 32.1852 19.747C32.2041 20.1379 32.197 20.5176 32.1713 20.8882C32.1031 21.8737 31.9033 22.7943 31.7097 23.6861C31.5285 24.5211 31.3528 25.3309 31.2956 26.1451C31.2663 26.5616 31.2681 26.9792 31.316 27.4019L32.2525 26.9074C32.2973 26.8839 32.3439 26.8651 32.3916 26.851C32.7047 26.7581 33.0623 26.8655 33.2403 27.1276C33.4438 27.4289 33.3329 27.8193 32.9909 27.9997L29.3579 29.9167C29.0166 30.0964 28.5744 29.9981 28.3701 29.6966C28.1665 29.3953 28.2774 29.0049 28.6195 28.8245L29.9745 28.1095C29.6398 26.4453 29.9694 24.9351 30.2988 23.4256C30.5795 22.1397 30.86 20.8544 30.7296 19.4749C22.915 18.1398 14.9417 18.1524 6.81018 19.512C6.53992 21.09 6.85568 22.5348 7.17174 23.981C7.50159 25.4903 7.83178 27.0011 7.49654 28.6663L8.85154 29.3814C9.19384 29.5611 9.30519 29.9519 9.10092 30.2535C8.89664 30.555 8.4547 30.654 8.11315 30.4736L4.48012 28.5566C4.13781 28.3769 4.02645 27.986 4.23074 27.6845C4.40804 27.4222 4.76608 27.3145 5.07941 27.4077C5.12707 27.4219 5.1737 27.4407 5.21851 27.4643L6.155 27.9588C6.20276 27.5361 6.20451 27.1185 6.17532 26.702C6.11812 25.8856 5.94209 25.0736 5.76084 24.2375C5.53407 23.1915 5.29911 22.1078 5.27844 20.9304C5.27187 20.5566 5.2869 20.1735 5.33063 19.7791C4.95135 19.8482 4.57211 19.9206 4.19268 19.9963C3.50942 20.1327 2.82556 20.2797 2.13982 20.4374C1.82068 20.5111 1.52622 20.2639 1.60345 19.9808C1.8613 19.0311 2.37277 17.2596 2.76565 16.6068C12.2057 14.172 22.8893 14.1386 34.6166 16.5057ZM0.530104 19.6836C0.530069 19.6838 0.530033 19.6839 0.529998 19.684C0.358954 20.3132 0.624618 20.8788 1.00736 21.203C1.38012 21.5188 1.89068 21.6469 2.38772 21.5323C2.98356 21.3953 3.57771 21.2665 4.17105 21.1459C4.21239 22.3105 4.43287 23.3643 4.63582 24.3034C4.64265 24.335 4.64945 24.3664 4.65621 24.3977C4.80389 25.0805 4.93511 25.6873 5.01163 26.2598C4.37564 26.2062 3.70845 26.4641 3.31134 27.0515L3.31125 27.0516C2.68829 27.9724 3.102 29.0979 3.96477 29.552C3.96534 29.5523 3.96591 29.5526 3.96648 29.5529L7.5971 31.4687C7.59719 31.4688 7.59729 31.4688 7.59738 31.4689C8.39092 31.8877 9.46755 31.7024 10.0198 30.8872C10.6438 29.966 10.2297 28.8394 9.366 28.3855C9.36573 28.3853 9.36545 28.3852 9.36517 28.385L8.71179 28.0402C8.85708 26.485 8.54984 25.0727 8.27935 23.834L8.27901 23.8324C8.01259 22.6122 7.78273 21.5595 7.82541 20.4854C15.2397 19.3293 22.5119 19.3136 29.6457 20.4349C29.6153 21.327 29.4227 22.2128 29.2048 23.2157C29.1829 23.3166 29.1607 23.4187 29.1384 23.5222C28.8841 24.7006 28.6232 26.0273 28.7592 27.4833L28.104 27.8291C28.1039 27.8292 28.1038 27.8292 28.1037 27.8293C27.2415 28.2841 26.8286 29.4087 27.4504 30.3292L27.4508 30.3298L27.4512 30.3304C28.0044 31.1469 29.0815 31.3291 29.8728 30.9124L29.8732 30.9122L29.8736 30.912L33.5063 28.9951C34.3687 28.5404 34.7818 27.4156 34.1599 26.495L34.1592 26.4939L34.1585 26.4929C33.7607 25.907 33.0946 25.6499 32.4595 25.7032C32.5307 25.1706 32.6494 24.6066 32.7856 23.9786C32.7923 23.9476 32.7991 23.9165 32.8059 23.8853C32.9863 23.0549 33.1876 22.1277 33.2703 21.1136C33.869 21.2416 34.4671 21.3776 35.0657 21.5211C35.5624 21.6405 36.0758 21.5172 36.4525 21.2027C36.8398 20.8794 37.1086 20.3125 36.9386 19.681C36.8214 19.2442 36.6499 18.6308 36.4581 18.0234L35.5196 15.8161L34.6522 16.4786L34.8643 15.4103C22.9985 13.0116 12.1322 13.0318 2.49002 15.5187L2.05004 15.6322L1.81432 16.0238C1.54191 16.4765 1.28122 17.2026 1.07641 17.8322C0.859031 18.5005 0.661222 19.2007 0.530104 19.6836ZM34.6456 16.5116L34.6456 16.5115C34.6454 16.5113 34.6453 16.5111 34.6451 16.5109L34.6456 16.5116Z"
                  fill="black"></path>
            <defs>
                <clipPath id="clip0_262_1471">
                    <rect width="36.9315" height="35.8185" fill="white"
                          transform="translate(0.591797 3.32397)"></rect>
                </clipPath>
            </defs>
        </svg>
    )
}