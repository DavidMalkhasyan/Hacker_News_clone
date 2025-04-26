import { Link } from "react-router-dom";
import "../styles/welcome.css";

const WelcomePage = () => {
    return (
        <div className="welcome-container">
            <table className="welcome-table" cellPadding="0">
                <tbody>
                    <tr>
                        <td className="welcome-td">
                            <Link to="/">Hacker News Security</Link>
                            <br />
                            <br />
                            <b>Welcome to Hacker News</b>
                            <br />
                            <br />

                            <p>
                                f you find a security hole, please let us know
                                at security@ycombinator.com. We try to respond
                                (with fixes!) as soon as possible, and really
                                appreciate the help. Thanks to the following
                                people who have discovered and responsibly
                                disclosed security holes in Hacker News:
                            </p>
                            <p>
                                2023-01-02: Carter Sande, Mark Slater, James
                                Darpinian Submission titles were no longer being
                                HTML-escaped in some places. 2022-09-04:
                                Dimitris Triantafyllidis User karma could be
                                increased by exploiting an upvote/unvote bug.
                                2021-07-04: RyotaK URL tricks could display the
                                wrong domain for some websites. 2021-06-07:
                                Atamyrat Hezretgulyyev A CSRF logout was still
                                possible in some cases. 2021-02-14: Michael
                                Brooks Set the SameSite cookie attribute for
                                better CSRF protection. 2017-04-30: Michael
                                Flaxman The minor version of bcrypt used for
                                passwords was susceptible to a collision in some
                                cases. 2017-04-14: Blake Rand Links in comments
                                were vulnerable to an IDN homograph attack.
                                2017-03-15: Blake Rand The right-to-left
                                override character could be used to obscure link
                                text in comments. 2017-03-01: Jaikishan Tulswani
                                Logged-in users could bypass 'old password' form
                                field.
                            </p>
                            <p>
                                HN is an experiment. As a rule, a community site
                                that becomes popular will decline in quality.
                                Our hypothesis is that this is not
                                inevitable—that by making a conscious effort to
                                resist decline, we can keep it from happening.
                            </p>
                            <p>
                                Essentially there are two rules here: don't post
                                or upvote crap links, and don't be rude or dumb
                                in comment threads.
                            </p>
                            <p>
                                A crap link is one that's only superficially
                                interesting. Stories on HN don't have to be
                                about hacking, because good hackers aren't only
                                interested in hacking, but they do have to be
                                deeply interesting.
                            </p>
                            <p>
                                What does "deeply interesting" mean? It means
                                stuff that teaches you about the world. A story
                                about a robbery, for example, would probably not
                                be deeply interesting. But if this robbery was a
                                sign of some bigger, underlying trend, perhaps
                                it could be.
                            </p>
                            <p>
                                The worst thing to post or upvote is something
                                that's intensely but shallowly interesting:
                                gossip about famous people, funny or cute
                                pictures or videos, partisan political articles,
                                etc. If you let that sort of thing onto a news
                                site, it will push aside the deeply interesting
                                stuff, which tends to be quieter.
                            </p>
                            <p>
                                The most important principle on HN, though, is
                                to make thoughtful comments. Thoughtful in both
                                senses: civil and substantial.
                            </p>
                            <p>
                                The test for substance is a lot like it is for
                                links. Does your comment teach us anything?
                                There are two ways to do that: by pointing out
                                some consideration that hadn't previously been
                                mentioned, and by giving more information about
                                the topic, perhaps from personal experience.
                                Whereas comments like "lol" or "That's the
                                dumbest thing I ever heard" teach us nothing.
                            </p>
                            <p>
                                Empty comments can be ok if they're positive.
                                There's nothing wrong with submitting a comment
                                saying just "Thanks." What we especially
                                discourage are comments that are empty and
                                negative—comments that are mere name-calling.
                            </p>
                            <p>
                                Which brings us to the most important principle
                                on HN: civility. Since long before the web, the
                                anonymity of online conversation has lured
                                people into being much ruder than they'd be in
                                person. So the principle here is: don't say
                                anything you wouldn't say face to face. This
                                doesn't mean you can't disagree. But disagree
                                without calling names. If you're right, your
                                argument will be more convincing without them.
                            </p>
                            <p>
                                <Link to="/">Hacker News</Link>
                                is a bit different from other community sites,
                                and we'd appreciate it if you'd take a minute to
                                read the following as well as the{" "}
                                <Link to="/">Hacker News</Link>.
                            </p>
                            <p>
                                HN is an experiment... (остальной текст по
                                аналогии)
                            </p>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default WelcomePage;
