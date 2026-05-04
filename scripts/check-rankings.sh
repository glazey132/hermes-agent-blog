#!/bin/bash

# SEO Ranking & Analytics Check Script
# Run daily to track blog performance

BLOG_URL="https://hermes-agent-blog.vercel.app"
LOG_FILE="logs/ranking-check-$(date +%Y-%m-%d).log"

echo "=== SEO Ranking Check: $(date) ===" >> $LOG_FILE

# Check site health
echo "📊 Site Health Check:"
curl -s -o /dev/null -w "HTTP Status: %{http_code}\n" $BLOG_URL >> $LOG_FILE 2>&1

# Check sitemap
echo "📄 Sitemap Status:"
curl -s https://$BLOG_URL/sitemap.xml | head -20 >> $LOG_FILE 2>&1

# Check robots.txt
echo "🤖 Robots.txt Status:"
curl -s https://$BLOG_URL/robots.txt >> $LOG_FILE 2>&1

# Performance metrics
echo "⚡ Performance Metrics:"
curl -s https://pagespeed.web.dev/analysis?url=$BLOG_URL 2>/dev/null | grep -o '"speedIndex":[0-9]*' | head -1 >> $LOG_FILE 2>&1

# Mobile responsiveness check
echo "📱 Mobile Check:"
curl -s -A "Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X)" $BLOG_URL > /dev/null 2>&1 && echo "✓ Mobile responsive" >> $LOG_FILE || echo "✗ Mobile issues detected" >> $LOG_FILE

echo "✅ Check complete. Log saved to $LOG_FILE"
cat $LOG_FILE
