import { Link } from "react-router-dom";
import "../styles/welcome.css";

const WelcomePage = () => {
    return (
        <div className="welcome-container">
            <table className="welcome-table" cellPadding="0">
                <tbody>
                    <tr>
                        <td className="welcome-td">
                            <Link to="/">Hacker News</Link>
                            <br />
                            <br />
                            <b>Hacker News Guidelines</b>
                            <br />
                            <br />

                            <p>
                                On-Topic: Anything that good hackers would find
                                interesting. That includes more than hacking and
                                startups. If you had to reduce it to a sentence,
                                the answer might be: anything that gratifies
                                one's intellectual curiosity. Off-Topic: Most
                                stories about politics, or crime, or sports, or
                                celebrities, unless they're evidence of some
                                interesting new phenomenon. Videos of pratfalls
                                or disasters, or cute animal pictures. If they'd
                                cover it on TV news, it's probably off-topic.
                            </p>
                            <p>
                                Please don't do things to make titles stand out,
                                like using uppercase or exclamation points, or
                                saying how great an article is. It's implicit in
                                submitting something that you think it's
                                important. Please submit the original source. If
                                a post reports on something found on another
                                site, submit the latter. Please don't use HN
                                primarily for promotion. It's ok to post your
                                own stuff part of the time, but the primary use
                                of the site should be for curiosity. If the
                                title includes the name of the site, please take
                                it out, because the site name will be displayed
                                after the link.
                            </p>
                            <p>
                                If the title contains a gratuitous number or
                                number + adjective, we'd appreciate it if you'd
                                crop it. E.g. translate "10 Ways To Do X" to
                                "How To Do X," and "14 Amazing Ys" to "Ys."
                                Exception: when the number is meaningful, e.g.
                                "The 5 Platonic Solids." Otherwise please use
                                the original title, unless it is misleading or
                                linkbait; don't editorialize. If you submit a
                                video or pdf, please warn us by appending
                                [video] or [pdf] to the title. Please don't post
                                on HN to ask or tell us something. Send it to
                                hn@ycombinator.com. Please don't delete and
                                repost. Deletion is for things that shouldn't
                                have been submitted in the first place. Don't
                                solicit upvotes, comments, or submissions. Users
                                should vote and comment when they run across
                                something they personally find interesting—not
                                for promotion.
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
                                HN is an experiment...
                            </p>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default WelcomePage;
