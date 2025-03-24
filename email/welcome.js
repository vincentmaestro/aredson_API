import nodemailer from 'nodemailer';

export default async function(recipient, name) {
    const transporter = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
            user: "a3b1b0cb16a783",
            pass: "a87b28b3f21e52"
        }
    });

    const message = {
        from: 'Aredson Developments <noreply@aredson.com>',
        to: recipient,
        subject: 'Welcome to Aredson!',
        html: `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <link rel="preconnect" href="https://fonts.googleapis.com">
                <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
                <link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet">
                <title>Welcome to Aredson</title>
                <style>
                    *{
                        margin: 0;
                        padding: 0;
                        box-sizing: border-box;
                    }
                
                    a {
                        text-decoration: none;
                    }
                
                        body {
                        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                        width: 75%;
                        margin: 0 auto;
                    }

                    .img-container {
                        background-color: #c0c0c0;
                        margin: 2% 0;
                        padding: 1% 0;
                    }

                    .img-box {
                        width: 24%;
                        margin: 0 auto;
                    }

                    .img-box img {
                        display: block;
                        width: 100%;
                    }

                    .greetings {
                        margin-bottom: 2%;
                    }

                    .greetings h3 {
                        display: flex;
                        column-gap: 4px;
                        /* align-items: center; */
                        font-size: 1.3rem;
                        font-weight: lighter;
                    }

                    .content p {
                        font-size: 1.1rem;
                        margin-bottom: 2px;
                        font-family: "poppins";
                        font-weight: 300;
                    }

                    .content p:first-child {
                        font-size: 1.3rem;
                    }

                    .content .proceed {
                        display: inline-block;
                        background-color: #c0c0c0;
                        color: #fff;
                        font-size: 1.2rem;
                        border-radius: 6px;
                        padding: 4px 12px;
                        margin-top: .2%;
                    }
                                
                    .content .contact:hover {
                        text-decoration: underline;
                    }
                            
                    .content .contact {
                        font-size: 15px;
                    }

                    .main footer small {
                        font-size: 1rem;
                    }

                    .main footer p {
                        font-size: 1.3rem;
                    }

                    .address small {
                        display: block;
                        font-size: .9rem;
                        font-family: "poppins";
                        font-style: italic;
                        font-weight: 300;
                    }

                    @media screen and (max-width: 1024px) {
                        .img-container {
                            margin-top: 5%;
                        }
                        .img-box {
                            width: 30%;
                        }
                    }

                    @media screen and (max-width: 768px) {
                        body {
                            width: 85%;
                        }
                        .img-container {
                            margin-top: 10%;
                        }
                        .img-box {
                            width: 36%;
                        }
                        .greetings {
                            margin-top: 4%;
                        }
                    }

                    @media screen and (max-width: 576px) {
                        .img-container {
                            margin-top: 12%;
                        }
                        .img-box {
                            width: 45%;
                        }
                        .greetings {
                            margin-top: 8%;
                        }
                    }

                    @media screen and (max-width: 425px) {
                        .img-container {
                            margin-top: 14%;
                        }
                        .img-box {
                            width: 50%;
                        }
                    }
                </style>
            </head>
            <body>
                <div class="img-container">
                    <div class="img-box">
                        <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAicAAACTCAMAAABiSkmlAAAAAXNSR0IArs4c6QAAAAlwSFlzAAAOwwAADsMBx2+oZAAAAMZQTFRFR3BM/v79+/v7/f39+/v6/Pv7+Pf2/Pz8+fn5/v3t/Pz8+Pj3+/n2+/v7+Pj2+Pj1/Pz8us/e+/r5/f399PP0/vXi/vjv+fr6/vvc/Pz9/Pz8/f3+5vn+2Oz5///++vr61My9//7Q3NTS7PHz4t7U////wbW3/+nT49zB8evc1eDkzuTtubCa1Mik59bDW3mLqJZqn6Cjjpec/////v7//v/+/Pz7+vr6/f39+f////728P//9vb2mbLE2///9v76OGF7dJKi699pcgAAADN0Uk5TAP7V9Ok7RZy//oLn8ZbfyyT+MVtR9vyo+nZnHPz5ELWw/235kQWK/bzt0uvk2PD2+6fVM1c+0gAAH+FJREFUeNrsneuOG0lyRlmXbnJ57W0SQ5BtiLbbMjD/DJzgFzHatMfv/1TGSEw0h626sMnVauE6+ieUisXKo4jMyAtHAwMDAwMDAwMD/y/4tN+Wy3lVfKWqlqvF5h63rCud7liuFpvhNf9z87ito+CSqpx+uuGWs4tbGkVVTp9G/3g+l3iRiVQU5egaFoV70UFUs97/Lx5qL7zoj9cPo0YmRTtVVa8Wj6OPsJsVKXiHOVSTD93y03Qm47tUq/2oN+Oz5vTCJ80XRnHC4TDqYJ8gE4C/rkdXMEaIDgwoqsOmjyezRG/ieOTXNk8MDIwGHA8V89X6aktqJ3iPgZMsJs+ja1nMSUYDVpT7/i1yhoJpjwudyaiDrWFkUuBsr/p6CYwOggRErB57xBNk9OTox2Pd6UkLAnCjXlyTLJ4mCYQH73AICOrd6Cr2tZxGZAnyy+tiARkJfPnUfSHe5cnTMkFGIHz5ck08iRA9EI5Tjbs9Cacvx+NRsxs8ESQBAbP+DftQAqYILpEQSgTE+JqUcyhwWjGYL3rmncQJAfiiM54k6PJklzgncKv218QTQHShwEkIVi9deUdc4YkfWz0JaFVFDsJEwOSpZ2dzRiADMy5xlMBI4IdRXzZLdB6fjEtcKMHkpU+LiDc8sPqx4cIgkzo9OYDECQUJrko8Y0d0YQgTLhLlS1feQVf0T7wj77RjkEIQSbB87KXJ0gIjcOOSwMEFwlHfiLKuCQQC4Hv+GRiBKB96eBKJEwqQceiKJyI6PHmeSbwRjonl8xWeANYr6+DgWIcoDzMTfTnG8djajw3MaMZwGZF7KbM+okwQOGqIUyIgBMl82q9rUmEIFzppYrzHA4fU4xHHl+JGte+40Drzzu59v93ku2s8OccI4xwncEBYGAHIx+2e8IbAAG/pn/zWmnfAwDCMBEbGAozAISFO9BFl4UGAGZ4jJYFBgHDI/mDqlcD3c11GOCACcwSygEz0ecQFl9jqc0fTdXoycXAyBmChw4c8yTYkMg4CI0IgHJOg2vf1BAeRaOKYjsc+ngSCBJmARAiRhPFG2dVH2czAEQ6YMAMTiQiycfH2HsunHmmMIBOB4zkqkQSAi0xYrJ6u9oQ0vdGTx18Bg4vMOHv4mCckRCA7QUACC0jCAXBS+dLTkyCBgzUQx2P08YSEwLETcoD0zkN1ds22EIBjCRB4kIrCCzlgeMLeMocWnUPskjMCEIYX/rV8SUIQZAxgcr0nxfLpNk+mQSSRMTMD8On1nmQCIyMzEJAcw8NQ5Nv38wQA0UAc+8UTCAmHiw47lgAjY0rtqeKxhoTjCEsGaT7Zbb4+93qxmhcCSFg2ZdbV0zsk3CATHsjL8fr5j1vutnWEkcSJwIQvrvZEvrjNk5WEMLgIKauP5p2iCI/ijZBwDCOEzDE8Ufb2pFCRvGhEhXp5IoDiDP/6aAJzcDK5KtXEQmGAAzj4RT19vwoclN+jtOhRlTAyAtXTl/N4s63EGY4z31zrCdSPt3iymYNZ4h2zx495Mh6943E3qUgkMMNRgpiv+3nCslcC7PYEI10m6Zf1oqwMzMgYpNaWXQW4DBMizaffqauGDDJedhQ5MSVEJt7X0p4n4WQSImlyrSchDrd4sgAcjAuk6Yc8Yfz9cuNWIIEjCAsWPT2p7+OJQN/Ndp/Gc+Fkwtr7Zg+1hQCw+P5w8/NjjZNJtE+WLSwgzqPZ5ntBp+KEEQCv+2s9Ieb7j3vyuZRAxiXB6oZ40jj4MwhDYJN+nqh+vIsnyPD0XfefVxCQCWfRNmcagAMg3zZ8VYxM2KK1eBUInEz53FSIy0QQxuRKT0jE6vOHPVlXYVkMXlcOGX/d9PbEIGPjxg5zBQkyyzZPrs9/3fM7Zvi0sStJBCLAhFp6KNM4HrPCx6ZuwkGQaW/S6dvAyAKsfGouxeEYJ47zfT9PDJKhMKE0/XCdbRvZE8FsV3HG4k6eZEpEtMWJH+9JZpIsAMNFBGnX/GWzJwHHsrFRjUxQtvV2sibCDNWbZqMSOIkTdujnCWaQAJKR/b/ak5elWb5Mtn0pBRlffcQTmj1ZOBiZetOzf/IjPHmoBUkIHF516PYEySeNr5WMTC2erF+NEykQ09ZpOMcgM3vu5YlwC/AIEIsPerJP+R06pP1omw0koFrf15N1lSCjav0zxJPM1JMDISKAurERxsevnpgCjpPmT41MUSwf+pYoV13TGQkyadfLExLk+q757PFjnhwMshq+fDotMbA/AN/e15NN7Tgnih/vCS2evCzJ0ynIed13xhMjHXMc/zAr44RIkZu+JR6LE8ahZ//k118N4SDQ4UOePC+NEw7bP/6C7I1D+XJXT/J4Mbd/L0/sXnmno8i8SOGQJ/Rs3OWJERyzTh/lseaEISg7rp6JM5Yv/Twpx4iEHCdV+3ZPulco+dd69UFhAJbIN71fPJk74oRmzz+VJ5s5yAwjIGnVmKB0PBoQhuK4ui2gTFOO56Zc32vhgIwTYr7pl3eWL78CDkJhq08f8GRCkLGvDbdTfhQJbe/cP+GNKEf9PJn9GE9GKzlYAKSWkfHev3mCxFE3ijK2rIkRNt9cs/DQNe3lCeVolwQmBJF213vyOEOcOJV1H5aGCAMMLZ/vOt5JBAgSIrajHzPe4YSBtXmyNSDADLD5ujFVHI+O57Uvx3rxdIeHg4BV98JhkTFj3Kd7LMrRaAUywMCWT1fX2aYEZHx3enQLACcC313tSbTVTywHThG7fp7E7Ad5sqsSwk+eNKfc1TEcyJ5EVPVh37FUv3v4DIlxv4V0GZv08YRU/jGsdU44i6s9WTnBCT/1F6YuzA0SpDjcMZ7sKgkMFIYtn2+a37m/J+sK5QsxNV45TkdSkD0BQUQ92bW50t0xFWnX/aYTmeSUvePJ6OA5UEr145WebCoZGT/kuOoOJMt1hCs9UZMn6xlEQBigrFO3J6koilQ0U63v48lDTYTr5EmMm306GpA9ESbHANWT3XU5aJ3EGz02100lyPjsoYcnQXk+sDJge6UnC0OcMM82T94W2yXS9E7x5NO4kjsYAeqckoWMQMho5PVWTzJLi17TD5OjI8+eEEAISyCKejJ9vmK4wxu+fOgWq3JOJKg3PTxB5de2luW9BVbtr/Lk8yrQ+zLwFIEhCGByB0+e14uyEoCLQJByg3V7goMwWQNR3cuTMkih7snT9RwB2RNcAQGOJKCYrxbPPT25mBjt4mHJG6la9/BEVn5b5iLAACJWn3t6kuU8E+VwtkzYcQyBq3681pNURFJxRipMiCQCEsnyVta+8cRpwe7myQTvN8k+LlxvniRIyBwCDOFAMeuzk3pBgoyVPTypIePM+3iSq3c7BQAReNpd48lWGJlqd1lLDuF4TK/0JBCc3dkBSOexIZh86ti/wxlBqyrz+3mCdXtyujLO4onlZwwEGI7A6/Gn7vKJyESf0L0kI/BpH0+iPGUPhYGBsPKpvydPS1lgBnhOO7nbEhgnVj096Y8Xh65hgPFGMgCjAfWNJ/TxJMh1r7ZW+zQJBAILDMIxLjBgnk1pmVPst0wlU0LGSNM+LWJlTpcEQQBKi3xhdHqyT0g4mBkc/rx0KpGZb+7rifGaQ1fPeII5ThOa380TEdZzc9ziFYcEhEiQeI8FVu/6ehL9PIkPeZLzhxAmQf3QO54clMBBxiljZVaC4EQs7utJtc0xr188SeAYThP38wRAPTfHPawKgaMAyXlPCJF829MT0t8znuRun8DALW37evJcA2EQoG9+ZRYyE5nVXT3RISe43vEkYSGa8Dt6YgGdnmT2pQNCAQSXOIB3dIjjJk+8tye5XYUb0tv/rrF3ebJLJAcw3DS5WAZ8RrW+b96ptp86PeENc3AaKYq79U9WAALLw/suHrZVyhvZxSWOsETi0M8T/q7xJG88NBxDidXnfvFkAhgEZhjTi+PaFJyQj+/qCYnZpv/oDyIM4U2exN08KY0E5/XYbtaHuggQ7xEkAF6bm1Pnnqx6nVxHxqjWPT3J7F6NfD5LtevlyWNtDoYFGL8+XozXrGE9zO2eJPB63d+TAKFUNHKvvPO8RCDMgOi/e+lpOqmTGxcIB0y0nBEy9TdPRHnNuiYw5r09yayQIwgzlU998s7UIYEw0rsr9pV443V/T09wiDy3fb91j7d7sqkxA8wA+fS6E18PdVXAOWaGAyIteniCzXrU7V9Fxqgfr/VkPQMLwwFf9Iknq7aCzUsJGTO2V3lSFPrTOaERhYNwEggw4orzT6z+QZ7s507O30Zaj65lMy6rwhwcYUSAGVjzoqd1Oh6vmwdMkDGaxVrQUOfdCicUIGYP3Z5sak4Yxnw7PrH94892XIZxIixmzzft33ncj8sAEojAwoj6ua8n/ChPFiKEnACLD0axh0VZFQCOGZjhJKp9g1nzOJLx192VI8vl6CpP8tg4AQKx7c47YzL5n2UsLk8v8LS7eb74cRXCHIkQYr776TyZWIKU+3nl6MPsV8nfgjGAj5s2jfrx4s21szKRiZhc6UmeN3YcQsw3+cImTz6XgownSAYZw7DghAOHO6wrmBgRBg7gjH+2/slzbWARJsDTYXQDz4cEAAZCzUOZ1Xn9pNvNh18hY8H4A568lAgkILEaLVKrJ+tXMgJwLIM5AiMjWD5fk3faGj/lusLqJ/Mk15MscIEtRreQ90HxDS0/N0zFHoMThnevo3YlMu7TazzJ7GSeCGR4teuIJ2MFmQTijQSJ5LwhNL3D+titEhgIS1D+bHnnAAgMy2dR3MTCAQMcV6Pr0/O8I7rGWAeHTPC66elJwwEOTirb+7FPK8gIQRh2AgsAQcax1R3Wx04dBxeeB4E/Uzx5rEMgQCS4eaPf08zAAIxo/A6byjnh4OXn9urJPKyp/ft7spkZgiAgrdTmyb4KLnquwYkwCEEmDFn9eHs8Wc+FkT+v2vxcnmwRCTATIQ6NLVBkPIq2RzsEGCDU/B1elkfIGB0DhrGDOGFsr/QksxUoAIFo82SLkXGyJheIlD3Hp7fHk8cZkEeLuZb4Y/cXy6bNuwEzhuO7tp1ZGfm6bY4PAARq/g5byxHdwVl9bj0+9LyEh+8+6MlDLcLINC+AeZ7hxhvCMN6RwAkInNXtnjzMgpQ9yXMTP/BcC0dSgycvpZHxIDWnnamfdevUtW0MwEVq9GSfZIAT4IQvOtZlpvNTA671JLNwgh6e7JIwMjKBYRcQEAgH0HxzB09IZysQdz090Z08cRzStHNfjNp3XO0qyAkFTfqcROCw/Ny20ysZIoRQyylJ01cHjBOxHX3Uk5cS9x6eHMA5Q4L3CEkQGILFzZ6MlqCk7Mn0h+cdJzXknS1vRPtHbuYGmBmSqPbN/WIj38981dyilkCREAmc5sgzR7iircrf7UmeN4ZuTx5nzhvyoijkKi4IABxwQKvbPSkT3zAo2j0x7p931DS79zTxEGRS6NC21TOAHG698Ti1bQCAiWRs22aAhUEiANzqTYMmYQQZi8noA55kVni3J9NAPZYhLZQgMMcdVevbPRFyAIPo7UnMHu7iiWHie586rcWfqTdt95MBIASkhvMKpjIAMKx908I24Qa4IQyo99+73xwzIgwwIKr9LZ5sKro9mYCjzlH4vsJBIBAa3+4JIMAMIvX1hDt5IiD59N0ByHNEYMaJMI3bt24GAHnedbn+3mG5IU56moJ5WxGgDuItNRqmdwv+nifpz+e3mw6jWzwZbbvjyWYuMOs81PFpKfRWal++3OyJYwisM57UBpmAIBUtRCEt+oyLBQKKb6govIgs0RvWvi7reZY9yQOPyYUFL4saI3sCaNUqXhJgOGYYQszHT+f3G1cIzAILsLzY4hZPHupOTxYuEBgkvCWfHMJQn9VKY+jlCSLo1Y81+mMENu46Z9joRoGg6xCpsUwgTpw2iq6fv0q0nh5qAdlNEF3z7SskDM5Rvd09/PEq9tsyuEB5KeUHPMlMJQPRuH/ncwmSMBI4ZfvvN0lktj+zJ4suT+jCEIBp3GPvpowLivgWo4z3lE/dP2wTvCMVyQsukURMRrd68lKCK1CTJ+t5CAMMB43bttEkupfJ9vdkQrx5ort6wu2eCBCJSa9D1ZxLRBKBOMOA1L2vbT83AzPjDAWAeE94+XKTJ7kQ5FjQ5MkYYYkQJrf5ur0AaEFmvrvVk7Oyr8X4J/PELIh+R1xOZHyXBO9JPcx7RbwnGeKScJaPoxs8yRyEBd7gydMyJSCCBFC2Pn6IMw43enIwwHKrLFoC2ZWe2F08SeCUz/1O83QuMSNA4gLLWaeNXfXd58HffYjlyaKbPdnM5UCDJ/sESQhkJM+N2n7QRz4P8jZPxpE9wYzD/eKJQVc/tpsExuql53lZGJcI8Q6z/DMpnamHSxyHdKGJUT6MbvMksw0iNXmyVQCBB6Guvv1KWNf5Yf09mQoj8kzg6kd5Yhi9SD6+4lepL0k4uOCcULcmeTJYxjkCwuHSk14/xT026/bkYdkcT55nWf0A1BETxwgyYnKbJ+uEYZiBQcuM1+M/xBPlilkfHlZc4thlTDH1adVcm5MBBhkH0oUnVU6wt3iSmUZqGhfvREbdB9ivK5wTaq6Mjk2QsXH7DzCeKIqy7fcy4jpR1OJJABA0kUComO1GV7F9BUEEQhCQESQkoL7qnuulAWA4BCeEBxEQ4Kuec12Lzp91yfPGvOFnnkzEGakl7eSS7BspmmblSXiP3QWlO86JwpuP8p2FRE8S4bSMnlaOBRgNOFhRrdaja3lcJRyQGZzjDgB5w31/dnX4u/qwAAi/RrsFAZmybbW3OOEwOWuB82V7qXMV6NbPy+PFpOGpVKQi05Lkt0XhRcabDxp4qIt+5OdK3hJPVEQUjURVTxab0Yd4nFSYAEsuO+HgyItce7+OXRlKQIRlCBRhUV4RnBapKDKpbBnhe/FGOowG/k7sJ/MiHOONFKRqsh99kOdxLZJ4w8CXi5fhZf9z82k/npR1pRyeysPueXQb6+2qrqriD6r5crVYD295YGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGDgh/G///J7URSuoih++03zpgMS/9uKv/ylOMP1y1//fMXv+vLrxb3/9ttffvn30Tn/WR2LzG+Y5NI8X5L5678U1WbUyX+sXlMh/VKV01HDU//mX74UX/m9kM8W372mSMpPmfnr778XX+Yvo8sH+63Ql+JEFF++6Mu//dfo8p8Wv1f7i6f45T8v3kIR357q96Lwb3cM/fKv3/uOc8mO6XW1/wd78j9/O37F7fjb/7V3tl2J61oc7xbhuoce5SDEzlgY5EEFOTgjzXM14/f/UrdFotI01oMvYN3Lfy1fiFltkv7y3zs7ZZmJn56Xc0IRacKWyZJmSqhgbLHR4iHWFDen+1nLIjrXsaHABaXJUmacCKEgdTnRNKzk5H4kJc97knDgZDYp5yRBpDTjkVJOqWLhj7I2nKl/gvf6HUtJSzlJEJVcXYwmiVJCXc0dToRUR5t3YN0CJyllS8ao1FoyVExSkSQuJ5PrnkyAJ4ImlPLaeMeccECAFDgYKVOAcFw245wgEgEc1mKk8O+s+k1t8NfGMO80YGEah7HkhBN7HcY4Z2HD4YRXcdL6W0sOQggGUlIK2ByWcsIQlWEMGANpJGfu4B614ByPCoAbCXhcwglDosD2XinBornLUopksOG0vMhJKAQHYBBrLrALmQRnDgj3sUwVgUycA1c42yknMTSDF11+PzIGkIzL/MSuHK+enyRON4dpsDt0/ARII/DJcgLhsBITyWo/zzMb6Vw0816Hpb1+9xw7P2sG2HHbZYlztFzaZ02lVN2Wy4nqzqs6LzlV2Lx8TyK/uQ5K1ehJflMPHFlX4yq86EyCyfnPGgDB2536Cbwzhk7PKGzWS2Ycr6w3e3T9pPFmuLkqcREU/cTwsF7JiSwEdNcEANlJ3xrXINZQ2muKV7fvbj6SKZk5TilqNdh4BJ0nmo4yJNouAxgNKjlJCKEw+zQn3ZZ/uZDF6xhngNi93CUn7DR4U3tkjDpxZ1y4nLjjUtF8I+yoqJjldWKjutWcmI85uddSkb/eB/JYSzyq4iS4lxSbxTaG1/6G9xnF5EGL9G57TghfcEnOA6vZR5xw3m17152a9t96daoQB7uMO+p0MzJY1y/6SZXr3WuD001/iRouJ+QTnMgP486wFxu8KIRyrbqDKk6GvazVZZETFt5y8/5p3el0cafLOelWcpIyMhjp9OwznNR7kt14OLl/0hv5Xp0jnuzST9Sps5oXrp9UcjLp9CS+Y+DxyaBjQY2RsfO/PSfPWuvmxI1E0ypOGjknrSIn6fHDyOCbPbVjXRtkLcPWVn5CsdvJQ+63N05I18tJzH2cPD/pjXR4cszI0R5x8vAkrd992k/sOuQ4f/cbJb8cTmKD4Rc5afW01t8cj5EYjZ0c1eEEoyInkofjR63e1v9AQ3g90rglJ5J0G+2eUc3Lak7aPal8nDxaTnYuy8m02HeMhp4Z98kSRqZvq1Jit13CSb5OqznpfNBlDua4H5T08B9/r+0Owo072UfjPxqa/VfADV/URxrL9zvVnOQZx1hrdWE5MexmWMFJedyBxX5y4l81jxqxkpNWrFVkA89fWuXm4uYn9Kuc3EuOZ+6nWl1NKzh51kadum2icSNm7NvrKIDM2z5OPuEngtQz2GJTO19zIrmPk1bOSd2bxxpyVt9PTvwrU0UOJ2U7udd5vJMYPQSun2gVtrfnxKYi7t5r+GTQyT2kunq3LRqPpMFBCSffgjOjLHrftArrrZ6Pk+r6CSPtl43dkeWEdCs48YxTKkWOT76194MTnBbTxDJOKEbIeCoEYwoE4/irJPDI1KbkrZHEab/ETzQlhHMAECJJBAA0Wx5O/Bil0di18NjdoTxK9kr35Pwk1sac9sv8JBhobp3wTuMiuPRyEhEAnnABggFjtUFJG5J341YDuV3HHa+fXOac+MqOl3dS0iThAPzoP+f7x8l9KSeAqCijL1oCw3nJyN52CWOtyloMYw2MMCopXWZKqGDhv+eERuOyexsydM93IgWMMsoZlVLCcSMo4WQQtGK7OevHJppnz0hj2b5Y4ZUSS5Ys6UrgcnInSdRe9cesnXMmyIdxx1ue7s9jSdMEaMoUZdPxHnIyL/H6CIEJAS9iBeu3qT2QwXpVkmhQyokinEAKazE4vvy3nEhVxslI05rDiUCkciloSpOUSpNj4ows4yTv7zrnOdfYbeTUeTiJFMBr91lt7LZZFxK/x/ASy2acdCs48WkyPmkyEAwop4o0O/uVn+jy/MR+5tfk91OKZ+tVafErxh23HvtVTmygS8OG4ycREgAO+U+taVNVN+4EA1tZOctHkHESZ5xsk8feGRv+7jQn45wTuh0nVucXRzWgXGEG8F5xYmfD2TlUqt+TbDXdY01tzd6p23+1HvtoeElfOjFkV3b8xMk7PZy0Y4ODFeD54K2fbMlJ67VWdDrJ4872nFjVL0IAjoudxp1mYTaM6lZVrPylUsDxai2paOjhJPwiJ/caSvbFDxpw4brg1W01J93xy/M9WYed9pqTekWdrYKT4CJenS/OgH/ACbecVOmCQze63p96bKdHSdTYkpNhDHiyyuPJovzvX6/b/9FxyV5kpkn0T3WvS/OT8coB4biVb06iabAtJ3aVXVp3NflFZkD8nKTqs5xMTiRGv/aHkz86wUWwJSf9O52G/WDg1Oy/xIm7s8G5sy2WeDPejpPueHWBGMfBZGRWOXz/S5zYvfd3nVcEZwknHR8nQDycPOviOURd4tWvfToH5GTuzGbq5rae4RkyCGYaSeNLnFx/dI+8z/3iZ5RM+95afrWf5Du0k6BuMKp/jRPJLCe5OyF5mAG/8XLCfX7yR+PVoLAU9omTey3tDLkzXq3Ok4FFYyQ9Kdf1J/NYcv3hwbTmWHij9UmjdbDt4k4wfoLjxozjNLCcNL7MST02ajRLSNdbZ2O+/OQ+NoUs7Mc++Uk9N3WXiEdJLCfVD3k0T1X04OekvQUn7ntKt5tlGRMtJsFWfrKOV/Unnf7VVHj7RU42jhpvtTa15IN6rPDFnVZPK7JxsyMg0e9dcnL0PonVxnq6Z2VWXVBK06PkpuXh5JPnO1XvPSacnL1eZ65zE+wEW3IS2dIgHHMkw485GVdyApaTl+tomZKbax8naeYn/vNicvvKfv/EAC4mu+SkabvyY6alhLIc8tG471F7X/mUhqpF4OOEhlv4iZMuc8EVOflxmaF90ZNaMkvW9pw8a5kwXNhCUCknrFudxwJpvQsWWktBul5OgPg4meTngLh6jzpo//hZMwbC37usn5gUgCdJfmYhpQD7JSXnHBABllmbvCEAcGWL4E5TLSkZeN8hl5CJwUqIwBn+cjkBxsWqSwZAoXun/kxKSSkAsGQplpQ1h8GWnBjLSSeWoNYpfH8kMXQ5YYlSkClZLuFFauqwZDmx+3XJ/H4yAu4/B3xcjTG/kxCKKFUb7LRuLyUXIskFSqnyNx4eaT4zy1fRfIY6nsCjGW32PZykZjV2kSGwTJaIqRAuJzITXa44kYYrVZYGDkIjjaAZuCnltVk/2JYTbjkJ7lKqyHDtJ1SV+Anl6/PLfMFQoEq5nJhkg5PznmSk+9vnJ5T56yeTQU0aSV9mG8mivtPvjepUMP5ywMePf3Y8swkFsZR5jqUaoQTwxajfNSHgTYiCc5cTDhzWSg3jeFx6px8nTc4BRuHZ94mv11gZLR/BcjJ5kByn9ltrBkJ3X1yYA2CMOZyA2Aysc2Ak9PlJE3iz7uUk6A+OQg6M12pHt+3gf1GTQ58POuiggw466KCDDjrooIMOOuiggw466KCDDvo/1H8BBqCI93KtZ5UAAAAASUVORK5CYII=" alt="Aredson logo">
                    </div>
                </div>
                <div class="main">
                    <div class="greetings">
                        <h3>Hello ${name} <span><img src="https://fonts.gstatic.com/s/e/notoemoji/16.0/1f44b/32.png" alt="wave"></span></h3>
                    </div>
                    <div class="content">
                        <p>Welcome to Aredson Developments.</p>
                        <p>We are glad to have you on board.</p>
                        <p>You received this mail to notify that your account registration has been approved and you can now proceed to enjoy our services.</p>
                        <br>
                        <p>Follow the link below to complete registration and log into your account</p>
                        <a class="proceed" href="https://aredson.com/completeregistration?user=${recipient}">Complete Registration</a>
                        <br>
                        <br>
                        <p>Reachout to us for any issues or enquiries at</p>
                        <a class="contact" href="mailto:hello@aredson.com">hello@aredson.com</a>
                        <br>
                        <br>
                        <footer>
                            <small>Sincerely,</small>
                            <p>Aredson Developments</p>
                        </footer>
                    </div>

                    <div class="address">
                        <small>18a Babatunde Dabiri Street Lekki Phase 1</small>
                        <small>Lagos, Nigeria</small>
                    </div>
                </div>
            </body>
            </html>
        `
    }

    return new Promise(async (resolve, reject) => {
        try {
            const info = await transporter.sendMail(message);
            resolve(info);
        }
        catch(ex) {
            reject(ex.message);
        }
    });
}