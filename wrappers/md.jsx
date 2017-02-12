import React from 'react'
import Helmet from 'react-helmet'
import SitePost from '../components/SitePost'
import SitePage from '../components/SitePage'
import { config } from 'config'
import catchLinks from 'catch-links';

class MarkdownWrapper extends React.Component {
    componentDidMount() {
      catchLinks(this.refs.markdown, (href) => {
        const ext = href.split('.').pop().toLowerCase();
        if (['zip', 'png', 'jpg', 'txt', 'md'].indexOf(ext) === -1) {
          this.context.router.push(href);
        }
      })
    }
    render() {
        const {route} = this.props
        const post = route.page.data
        let layout, template

        layout = post.layout

        if (layout != 'page') {
            template = <SitePost {...this.props}/>
        } else {
            template = <SitePage {...this.props}/>
        }

        return (
            <div>
              <Helmet title={ `${post.title} - ${config.siteTitle}` }/>
              { template }
            </div>
            );
    }
}

MarkdownWrapper.propTypes = {
    route: React.PropTypes.object,
}

export default MarkdownWrapper
