"""add follows

Revision ID: 6028cfcd3eb6
Revises: 7746dc7cf349
Create Date: 2025-04-01 09:16:34.638395

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '6028cfcd3eb6'
down_revision = '7746dc7cf349'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('follows',
    sa.Column('id', sa.Integer(), autoincrement=True, nullable=False),
    sa.Column('follower_id', sa.Integer(), nullable=False),
    sa.Column('followed_id', sa.Integer(), nullable=False),
    sa.Column('follow_date', sa.DateTime(), nullable=True),
    sa.ForeignKeyConstraint(['followed_id'], ['users.id'], name=op.f('fk_follows_followed_id_users')),
    sa.ForeignKeyConstraint(['follower_id'], ['users.id'], name=op.f('fk_follows_follower_id_users')),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('follower_id', 'followed_id', name='unique_follow')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('follows')
    # ### end Alembic commands ###
