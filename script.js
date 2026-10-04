async function convertCurrency() {

    const amount =
        document.getElementById("amount").value;

    const from =
        document.getElementById("fromCurrency").value;

    const to =
        document.getElementById("toCurrency").value;

    const result =
        document.getElementById("result");


    if (amount === "" || amount <= 0) {

        result.innerHTML =
            "<span class='error'>Please enter a valid amount.</span>";

        return;
    }


    if (from === to) {

        result.innerHTML =
            `${amount} ${from} = ${amount} ${to}`;

        return;
    }


    result.innerHTML = "Converting...";


    try {

        const url =
            `https://api.frankfurter.dev/v2/rate/${from}/${to}`;


        const response =
            await fetch(url);


        if (!response.ok) {

            const errorData =
                await response.json();

            throw new Error(
                errorData.message ||
                "Unable to get exchange rate."
            );
        }


        const data =
            await response.json();


        const convertedAmount =
            (amount * data.rate).toFixed(2);


        result.innerHTML = `

            ${amount} ${from}

            =

            ${convertedAmount} ${to}

        `;


    } catch (error) {

        result.innerHTML =
            `<span class="error">
                ${error.message}
            </span>`;

    }

}