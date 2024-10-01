const modelContainer = document.getElementById("model-content");

function getQueryParams() {
    return new URLSearchParams(window.location.search);
}

window.onload = function () {
    const params = getQueryParams();
    // headerImg.setAttribute("src", params.get("image"));
    const contentDiv = document.createElement("div");
    contentDiv.innerHTML = `
        <div class="model-items-wrapper">
            <div class="model-items-container" style="display: block;">
                <h4 style="font-size: 36px; font-weight: 300;">${params.get("brand")}</h4>
                <h1 style="font-size: 86px;">${params.get("model")}</h1>
                <div class="model-items-sub" style="margin-top: 50px;">
                    <div style="display: flex; gap: 20px; align-items: center;">
                        <p>Price</p>
                        <h4 class="model-price">${params.get("price")}</h4>
                    </div>
                    <div style="display: flex; gap: 20px; align-items: center;">
                        <p>Max Speed</p>
                        <h4 class="model-speed">${params.get("max_speed")}</h4>
                    </div>
                    <div style="display: flex; gap: 20px; align-items: center;">
                        <p>Power</p>
                        <h4 class="model-power">${params.get("power")}</h4>
                    </div>
                </div>
            </div>
            <img src="${params.get("image")}" class="model-image" />
        </div>
        
        <div class="model-child-content">
            <div class="model-child-image">
                <img src="${params.get("image_overview")}" class="model-child-image" width="100"/>
            </div>
            
            <div class="model-child-text">
                <h1>OVERVIEW</h1>
                <p>${params.get("overview")}</p>
            </div>
        </div>

        <div class="model-child-content">
            <div class="model-child-engine">
                <h1>ENGINE</h1>
                <p>${params.get("engine")}</p>
            </div>
            <div class="model-child-engine-img">
                <img src="${params.get("image_engine")}" class="model-child-image" width="100"/>
            </div>
        </div>

        <div class="model-child-layout">
            <div class="model-child-layout-image">
                <img src="${params.get("image_interior")}" />
            </div>
            <div class="model-child-layout-image" style="position: absolute; right: 0;">
                <img src="${params.get("image_exterior")}" />
            </div>
        </div>

        <div class="model-child-desc">
            <div>
                <h1>INTERIOR</h1>
                <p>${params.get("interior")}</p>
            </div>
            <div>
                <h1>EXTERIOR</h1>
                <p>${params.get("exterior")}</p>
            </div>
        </div>

        <h1 style="text-align: center; margin-bottom: 40px;">SPECIFICATIONS</h1>

        <div class="model-table-container">
            <table class="model-table">
                <tr>
                    <td><h4>MAX POWER</h4></td>
                    <td style="text-align: end;"><p>${params.get("power")}</p></td>
                </tr>
                <tr>
                    <td><h4>TOP SPEED</h4></td>
                    <td style="text-align: end;"><p>${params.get("max_speed")}</p></td>
                </tr>
                <tr>
                    <td><h4>ACCELERATION</h4></td>
                    <td style="text-align: end;"><p>${params.get("acceleration")}</p></td>
                </tr>
                <tr>
                    <td><h4>POWER CONSUMPTION</h4></td>
                    <td style="text-align: end;"><p>${params.get("power_consumption")}</p></td>
                </tr>
                <tr>
                    <td><h4>PRICE</h4></td>
                    <td style="text-align: end;"><p>${params.get("price")}</p></td>
                </tr>
            </table>
        </div>
        
    `;

    modelContainer.appendChild(contentDiv);
}



